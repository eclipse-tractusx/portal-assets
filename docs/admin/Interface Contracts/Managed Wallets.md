## Managed Wallets

<br>

### Interface Summary

Wallets are <strong>the touchpoint of company/participant to SSI as the digital identity</strong>. Companies can interact with other actors in the network using their own identity on their wallet.
Since SSI Wallets are not yet common on company level, Catena-X decided to create CX managed wallets for membership companies. This wallets can be used to enable the benefits of SSI for a number of services.
<br>
The Portal / Managed Service connection is implemented in 2 functions

- Company Registration - initial wallet creation
- EDC Registration - EDC Self-Description creation
  <br>
  <br>

### Architecture Overview

<br>

#### #1 Company Registration

<br>
<img width="1000" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/company-registration-backend-interactions.png">
<br>
<br>

#### #2 EDC Registration

<br>
<img width="1044" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/clearringhouse-sd-factory.png">
<br>
<br>

### Authentication Flow / Details

<br>
<br>
<img width="1000" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/user-authentification-backend-flow.png">
<br>
<br>

### Description of the functional interface (WHAT)

Creation of a managed wallet for the newly registered legal person / company.
<br>
<br>

### Description of the physical interfaces (HOW)

#### Wallet Creation & BPN VC

As part of the application/registration process, the portal triggers the managed identity wallet to create a new wallet tenant (with bpn).
In a later step (with the final activation of the company account) the membership credential is getting added.

The portal <-> miw communication is triggered by the checklist worker - however in case there should be troubles / issues with the worker - manual triggers are available as well:

- /api/administration/registration/application/{applicationId}/trigger-identity-wallet
- ..for the registration activation, no manual trigger is existing

Relevant endpoints from MIW side:

- POST /api/wallets
- POST /api/credentials/issuer/membership

<br>

Additional Details: [Click here](/docs/developer/02.%20Technical%20Integration/04.%20Credentials/00.%20Wallet%20Creation.md)

<br>
<br>

#### Framework VC

...details will follow...

<br>

Additional Details: [Click here](/docs/developer/02.%20Technical%20Integration/04.%20Credentials/01.%20Get%20UseCase%20Credential.md)

<br>
<br>

#### Dismantler VC

...details will follow...

<br>

Additional Details: [Click here](/docs/developer/02.%20Technical%20Integration/04.%20Credentials/02.%20Other%20Certificates.md)

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
