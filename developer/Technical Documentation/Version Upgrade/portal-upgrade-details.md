## Summary

This document describes the portal database changes and its impact on transactional data. Depending on the impact, possible risks/impediments on upgrades as well as mitigation plans are described.
Each section includes the respective change details, impact on existing data and the respective release with which the change is getting active.

<br>

> **_INFO:_** inside the detailed descriptions below, the definition 'migration script' refers to the term 'migrations' as it is defined by the ef-core framework: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations

<br>
<br>

#### Database Constrains - UPDATE - 1.7.0

before updating the database from v14 to v15 the following script should be executed on the database to make sure that the database dump can be imported without any problems and errors.

```sql
ALTER TABLE portal.connector_assigned_offer_subscriptions DROP CONSTRAINT IF EXISTS CK_Connector_ConnectorType_IsManaged;
DROP FUNCTION IF EXISTS portal.is_connector_managed;

ALTER TABLE portal.verified_credential_type_assigned_use_cases DROP CONSTRAINT IF EXISTS CK_VCTypeAssignedUseCase_VerifiedCredentialType_UseCase;
DROP FUNCTION IF EXISTS portal.is_credential_type_use_case;

ALTER TABLE portal.company_ssi_details DROP CONSTRAINT IF EXISTS CK_VC_ExternalType_DetailId_UseCase;
DROP FUNCTION IF EXISTS portal.is_external_type_use_case;

DROP TRIGGER IF EXISTS ct_is_connector_managed ON portal.connector_assigned_offer_subscriptions;
DROP FUNCTION IF EXISTS portal.tr_is_connector_managed;

DROP TRIGGER IF EXISTS ct_is_credential_type_use_case ON portal.verified_credential_type_assigned_use_cases;
DROP FUNCTION IF EXISTS portal.tr_is_credential_type_use_case;

DROP TRIGGER IF EXISTS ct_is_external_type_use_case ON portal.company_ssi_details;
DROP FUNCTION IF EXISTS portal.tr_is_external_type_use_case;

CREATE FUNCTION portal.tr_is_connector_managed()
RETURNS trigger
VOLATILE
COST 100
AS $$
BEGIN
IF EXISTS(
    SELECT 1
    FROM portal.connectors
    WHERE Id = NEW.connector_id
    AND type_id = 2
)
THEN RETURN NEW;
END IF;
RAISE EXCEPTION 'the connector % is not managed', NEW.connector_id;
END
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER ct_is_connector_managed
AFTER INSERT
ON portal.connector_assigned_offer_subscriptions
INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE portal.tr_is_connector_managed();

CREATE FUNCTION portal.tr_is_credential_type_use_case()
RETURNS trigger
VOLATILE
COST 100
AS $$
BEGIN
IF EXISTS (
    SELECT 1
    FROM portal.verified_credential_types
    WHERE Id = NEW.verified_credential_type_id
    AND NEW.verified_credential_type_id IN (
        SELECT verified_credential_type_id
        FROM portal.verified_credential_type_assigned_kinds
        WHERE verified_credential_type_kind_id = '1'
    )
)
THEN RETURN NEW;
END IF;
RAISE EXCEPTION 'The credential % is not a use case', NEW.verified_credential_type_id;
END
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER ct_is_credential_type_use_case
AFTER INSERT
ON portal.verified_credential_type_assigned_use_cases
INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE portal.tr_is_credential_type_use_case();

CREATE FUNCTION portal.tr_is_external_type_use_case()
RETURNS trigger
VOLATILE
COST 100
AS $$
BEGIN
IF NEW.verified_credential_external_type_use_case_detail_id IS NULL
THEN RETURN NEW;
END IF;
IF EXISTS (
    SELECT 1
    FROM portal.verified_credential_external_type_use_case_detail_versions
    WHERE Id = NEW.verified_credential_external_type_use_case_detail_id
    AND verified_credential_external_type_id IN (
        SELECT verified_credential_external_type_id
        FROM portal.verified_credential_type_assigned_external_types
        WHERE verified_credential_type_id IN (
            SELECT verified_credential_type_id
            FROM portal.verified_credential_type_assigned_kinds
            WHERE verified_credential_type_kind_id = '1'
        )
    )
)
THEN RETURN NEW;
END IF;
RAISE EXCEPTION 'the detail % is not an use case', NEW.verified_credential_external_type_use_case_detail_id;
END
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER ct_is_external_type_use_case
AFTER INSERT
ON portal.company_ssi_details
INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE portal.tr_is_external_type_use_case();
```

#### Company Credential Details - NEW - 1.6.0

* NEW: portal.use_case_descriptions
* NEW: portal.company_ssi_details
* NEW: portal.company_ssi_detail_statuses
* NEW: portal.verified_credential_types
* NEW: portal.verified_credential_type_kinds
* NEW: portal.verified_credential_type_assigned_kinds
* NEW: portal.verified_credential_type_assigned_use_cases
* NEW: portal.verified_credential_type_assigned_external_types
* NEW: portal.verified_credential_external_types
* NEW: portal.verified_credential_external_type_use_case_detail_versions

New use_case_descriptions table released to be able to create translatable use case descriptions.
New verified_credential_types, verified_credential_type_kinds & verified_credential_type_assigned_kinds tables to store the type of the credentials as well as the kind of the type and have a mapping between the type and kind available.
New company_ssi_details_statuses table to have static data of the status.
New company_ssi_details table to be able to safe the credential details for a specific company.
New verified_credential_type_assigned_use_cases to map the verified_credential_type to a specific use case.
New verified_credential_external_types, verified_credential_external_type_use_case_detail_versions and verified_credential_type_assigned_external_types tables to have the versions for each type including the link from the verified_credential_external_types of a specific version to the verified_credential_types

Company SSI Database Structure
![Company SSI Database Structure](/public/assets/images/docs/company-ssi-database.png)

Use Case Database Structure
![Use Case Database Structure](/public/assets/images/docs/use-case-database.png)

* NEW: table "language_long_names"
* ENHANCED: table portal.languages "long_name_de" and "long_name_en" removed

New language_long_names table released for multi language support.

Impact on existing data:
As part of the migration, for all existing language stored in the table portal.languages, the short name will be used to define language.Newly created table language_long_names
will have foreign key relation with languages table where long name will be stored for each corresponding short name of language table in german and english language for e.g below

<br>

language_long_names:

short_name | language_short_name | long_name
--- | --- 
ch | de | chinesisch
ch | en | chinese
fr | de | franzoesisch
fr | en | french
es | de | spanisch
es | en | spanish

<br>
<br>

#### Connectors - CHANGED - 1.6.0

* REMOVED: removed table connector_client_details
* REMOVED: column daps_registration_successful

The DAPS was completly removed from the portal services, hence the connector_client_details table was removed, as well as the daps_registration_successful column from the connector table.


#### Technical User Profiles - NEW - 1.4.0

> **_INFO:_** Please note: the technical user profiles will remove the interim solution of technical_user_needed within the service_details table, which was introduced in 1.1.0

* NEW: portal.technical_user_profiles
* NEW: portal.technical_user_assigned_user_roles

New technical_user_profiles table released to provide technical user profiles for apps and dataspace services.
New technical_user_assigned_user_roles table to assign multiple roles to a technical user proile.

Until the corresponding endpoint is implemented to add technical user profiles, you can use the following script, please make sure the ids used in appTechnicalUserRole and serviceTechnicalUserRole are correct and existing in the database:

``` sql
DO $$
    DECLARE appTechnicalUserRole uuid = '607818be-4978-41f4-bf63-fa8d2de51169';
    DECLARE serviceTechnicalUserRole uuid = '607818be-4978-41f4-bf63-fa8d2de51155';
    DECLARE appTuProfileIds uuid[];
    DECLARE serviceTuProfileIds uuid[];
BEGIN
    INSERT INTO portal.technical_user_profiles (id, offer_id) SELECT gen_random_uuid(), o.id FROM portal.offers as o LEFT JOIN portal.technical_user_profiles as tup ON o.id = tup.offer_id WHERE tup.offer_id IS NULL AND offer_type_id = 1 RETURNING id into appTuProfileIds;
    INSERT INTO portal.technical_user_profiles (id, offer_id) SELECT gen_random_uuid(), service_id FROM portal.service_details as sd LEFT JOIN portal.technical_user_profiles as tup ON sd.service_id = tup.offer_id WHERE tup.offer_id IS NULL AND sd.service_type_id = 1 RETURNING id into serviceTuProfileIds;
    INSERT INTO portal.technical_user_profile_assigned_user_roles (technical_user_profile_id, user_role_id) SELECT a.id, appTechnicalUserRole FROM (SELECT unnest(appTuProfileIds) AS id) as a;
    INSERT INTO portal.technical_user_profile_assigned_user_roles (technical_user_profile_id, user_role_id) SELECT s.id, serviceTechnicalUserRole FROM (SELECT unnest(serviceTuProfileIds) AS id) as s;
END $$;
```

Impact on existing data:

As part of the migration the `technical_user_needed` flag within the `service_details` table will be removed. Therefore all existing apps and services in the offer table needs to be manually updated, if they should keep a technical user profile. See the above mentioned script as an option.

<br>
<br>

#### License Types - NEW & ENHANCED- 1.4.0

* NEW: table "license_types"
* ENHANCED: table portal.offers "license_type_id" added

New license_types table released to manage license need for app/services with a COTS/FOSS label.


Impact on existing data:
As part of the migration, for all existing offer stored in the table portal.offers, the license_type_id will be used to define license need for apps and services for respective offer where default value of license_type_id is 1 i.e COTS.

<br>

Supported license types:

license_type_id | license_type 
--- | --- 
1 | COTS
2 | FOSS

<br>
<br>

#### Mediatype - NEW & ENHANCED - 1.2.0

* NEW: table "media_types"
* ENHANCED: table portal.documents "media_type_id" added

Impact on existing data:
As part of the migration, for all existing documents stored in the table portal.documents, the filename extension will be used to define and store the media_type_id of the respective document inside the new table attribute. Important: check beforehand if all documents have a document type added inside the document name. If not, add the respective media type or delete the document.
Additionally check if all stored documents are supported by the media types migrated in table portal.media_type. In case any other document media type is currently loaded/stored inside the table portal.documents, the migration will fail. In this case delete the document beforehand or enhance the migration script media types supported.

<br>

Supported media types:

media_type_id | media_type 
--- | --- 
1 | .jpg 
1 | .jpeg
2 | .gif
3 | .png
4 | .svg
5 | .tif
6 | .pdf
7 | .json

<br>

> **_INFO:_** additional media types (e.g. .pem, .ca_cert, .pkx_cer, .octet)  are added in version 1.2.0 and 1.3.0


<br>
<br>

#### Application Checklist - ENHANCED - 1.1.0

* NEW: portal.processes
* NEW: portal.process_types
* ENHANCED: table company_applications "checklist_process_id" added
* ENHANCED: table process_steps "process_id" added
* REMOVED: removed table application_assigned_process_steps

Impact on existing data:
Existing company registration data currently under validation are automatically expanded with the respective attribute values for the new tables/attributes
* processes
* process_types
* checklist_process_id
* process_id

No manual intervention needed.
For company applications currently in status "under creation" (which means not yet submitted for validation) the change has no impact, since the process_id is created as part of the registration submitted. As soon as the participant submits the registration, the new process with the process_id will apply.

<br>
<br>

#### Service Details - NEW (interim) - 1.1.0

* NEW: table "service_details"
* REMOVED: table service_assigned_service_types

New service_detail table released to manage technical user need for services with a true/false flag.
Attributes
* service_id
* service_type_id (connected to portal.service_types and replacing table service_assigned_service_types)
* technical_user_needed (true/false flag)

<img width="376" alt="image" src="https://user-images.githubusercontent.com/94133633/228341713-1bbc0354-0ebf-42f7-bc37-135567037b60.png">

Impact on existing data:
Migration script existing, based on the service type which is fetched for all existing data from portal table service_assigned_service_types, the technical_user_needed attribute is set to "true" for "DATASPACE_SERVICE" services and "false" for "CONSULTANCE_SERVICE".
Transactional data are automatically updated/migrated. 

<br>

> **_INFO:_** Please note: this is an interim solution which is expected to get replaced/changed in version 1.4.0

<br>
<br>
