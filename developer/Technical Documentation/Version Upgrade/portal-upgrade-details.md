## Summary

This document describes the portal database changes and its impact on transactional data. Depending on the impact, possible risks/impediments on upgrades as well as mitigation plans are described.
Each section includes the respective change details, impact on existing data and the respective release with which the change is getting active.

<br>

> **_INFO:_** inside the detailed descriptions below, the definition 'migration script' refers to the term 'migrations' as it is defined by the ef-core framework: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations


<br>
<br>

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
