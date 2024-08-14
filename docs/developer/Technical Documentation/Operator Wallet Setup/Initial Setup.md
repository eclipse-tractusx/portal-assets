# Initial operator wallet setup

To setup the wallet for the operator the following steps needs to be executed

1. Request the wallet from the wallet provider
2. Get the companyId of the operator company from the database
3. Create the necessary data for the wallet creation
4. Post the wallet information to the portal

## Wallet request

The provider of the wallet needs to provide the initial wallet information for the operator. The needed information are the did, the did document and authenticationDetails containing the AuthenticationServiceUrl, the clientId and the client secret.

## Retrieving company id

using the company name the company can be found in the `portal.companies` table with this query:

```sql
SELECT id
FROM portal.companies
WHERE name = '(Operator Name)';
```

keep the company id for the later steps.

## Create necessary data

Before executing the scripts please make sure that there is no company_application entry with the company_id matching the id from aboves query.

After you ensured that no company_application exists for the operator company, the following scripts need to be executed:

```sql

    INSERT INTO portal.processes(id, process_type_id, lock_expiry_date, version)
    VALUES ('9782562f-5ba1-467f-b4da-a8d50d727145', 1, null, '9782562f-5ba1-467f-b4da-a8d50d727145');


    INSERT INTO portal.process_steps(id, process_step_type_id, process_step_status_id, date_created, date_last_changed, process_id, message)
    VALUES
        ('d9e8f517-d4f2-45ba-8b51-40a67d69f705', 1, 2, now(), null, '9782562f-5ba1-467f-b4da-a8d50d727145', null),
        ('2bd950c9-8561-4134-aa8f-04f6e673b1a1', 2, 2, now(), null, '9782562f-5ba1-467f-b4da-a8d50d727145', null),
        ('6aebf164-be91-486f-97be-699969d5cafb', 3, 3, now(), null, '9782562f-5ba1-467f-b4da-a8d50d727145', null),
        ('e85cf473-0321-4428-818a-3e595086ac94', 20, 2, now(), null, '9782562f-5ba1-467f-b4da-a8d50d727145', null),
        ('f895567f-50a0-4391-a086-24f6a046af7c', 21, 1, now(), null, '9782562f-5ba1-467f-b4da-a8d50d727145', null);

    INSERT INTO portal.company_applications(id, date_created, date_last_changed, application_status_id, company_id, last_editor_id, checklist_process_id, company_application_type_id, onboarding_service_provider_id)
    VALUES ('31322991-f6fd-4a40-a529-566c9b04d6a4', now(), null, 7, 'your company id', null, '9782562f-5ba1-467f-b4da-a8d50d727145', 1, null);

    INSERT INTO portal.application_checklist(application_id, application_checklist_entry_type_id, date_created, date_last_changed, application_checklist_entry_status_id, comment)
        VALUES ('31322991-f6fd-4a40-a529-566c9b04d6a4', 1, now(), null, 3, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 2, now(), null, 3, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 3, now(), null, 2, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 4, now(), null, 1, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 5, now(), null, 1, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 6, now(), null, 1, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 7, now(), null, 1, null),
               ('31322991-f6fd-4a40-a529-566c9b04d6a4', 8, now(), null, 1, null);

```

## Post company data

After the database setup is done post the data you received for the wallet to the endpoint `POST: /api/administration/registration/dim/{bpn}` this will simulate a callback from the DIM (Decentralized Identity Management) middle layer and continue the application checklist process.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
