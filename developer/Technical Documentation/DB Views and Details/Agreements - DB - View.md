## Agreements

### Agreement Table Connection

<br>

<img width="978" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/850e9dc6-aae9-41ad-9976-6227758f4528">

<br>
<br>

### Details

Agreements used inside the registration and portal lifecycle flow are stored inside the agreement table.
The table is mainly connected to the following 5 tables:

- documents (to link a document to an agreement)
- consents (stores the given consent by the company user to the respective agreement)
- agreement_assigned_offers (used for agreements owned by offer providers and can get displayed in the offer subscription process to the user)
- agreement_assigned_offer_types (depending on the offer type, agreements can get mappes and will be used in the offer release process to request for consent from the offer provider upfront to publishing)
- agreement_assigned_company_roles (used to link agreements to company rules; will be displayed in the 'registration' and 'change company role' function

<br>

Key functions:
* documents can be ACTIVE/INACTIVE (only active documents are relevant)
* mandatory tag (agreements can be mandatory or non-mandatory; mandatory agreements need to receive a user consent before proceeding with the functional flow)

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
