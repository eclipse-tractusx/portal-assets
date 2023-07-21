## Categories of Data

The CX Portal & Network Services system stores different types of data in the same database: the master / static data, business base data, as well as the transaction data. Therefore, we need to classify all data / entities of CX into the following groups:

<br>
<p align="center">
<img width="507" alt="image" src="https://user-images.githubusercontent.com/94133633/223835660-14776d9f-c035-408e-8068-e0d64c47619e.png">
</p>
<br>
<br>

Layer 1: Environment Configuration / Product Data
The first layer contains the system configuration and holds all items that are required to run the application in an environment. The artifacts of layer 1 are automatically deployed to the different environments via the CI/CD pipeline. Layer 1 represents the base software, which is the same for all environments in all markets. However, the required system configurations may differ slightly from environment to environment and must therefore be managed by the CI/CD pipeline.

Layer 1 includes the following configuration items, but is not limited to these items: DB Setup, Network Paths, Authentication, Application Server Setup, Hostnames, Service Accounts, SSL Certificates. 

<br>
<br>

Layer 2: Master/Static Data Configuration
The second layer contains all data that is required for the business base setup of the system.

Those data are part of the CI/CD deployment chain.

<br>
<br>

Layer 3: Transactional Data
The fourth layer holds all transaction and master data, which is created on a daily basis in the system, such as users, apps and contracts. This data is always specific for one environment and is therefore not deployed by the CI/CD pipeline.

Transactional data is created by operating the system in a market or testing activities. 

<br>
<br>

## Master Data

* Agreement
  * Category
  * Consent Status
* Application 
  * Invitation Status
  * Checklist State
  * Checklist Type
  * Company Application Status
  * Process Step Status
  * Process Step Type
* Countries
* Language
* Company 
  * Status
  * Role
  * BPDM Identifier
  * Unique Identifier
* User
  * Status
* Service Account
  * Status
  * Type
* Connector
  * Status
  * Type
* Document
  * Status
  * Type
* Identity Provider Status
* Notification
  * Type
  * Topic
* Offer
  * Status
  * Type
  * Subscription Status
  * Service Type
* Privacy Policy

<br>
<br>

## Transactional Data

* Invitation
* Companies
* Users
* Service Accounts
* Identity provider
* Connectors
* Offer
* Subscription
* App Instance
* etc.

<br>
<br>

## Layering Concept on Keycloak side

For keycloak, the concept is similar.

There is a base setup (provided as static data setting) as well as transactional data.

The difference between keycloak and portal is inside the load.

Its not planned to have soon any delta updates in keycloak regarding the base data. Off course there will changes in the inital load, but for a certain time those are planned to get added by the operator manually till an actual delta load solution is in place.

<br>

Initial data load in regards of the different instances

<br>

Central Keycloak Instance

* Realm: 'Master' & 'Operator'
* User: operator admin (master realm); CX Admins (operator realm)
* Clients:

<br>
<br>

<img width="1115" alt="image" src="https://user-images.githubusercontent.com/94133633/223836590-5109c211-5565-465e-becb-3841f55d00c2.png">


* Technical Users

Following technical users are part of the base setup of the portal and will be automatically deployed:

| **ID** | **Name** | **Description** | **Service** | **Assigned Roles** |
|---|---|---|---|---|
| 1 | sa-reg-1 | Portal technical user to connect to central idp. | Central IdP (Core) | to be added |
| 2 | sa-reg-2 | Portal technical user to connect to shared idp. | Shared IdP (Core) | to be added |
| 3 | sa-cl5-custodian-1 | Technical user of SD Factory to wallet | SD Factory (Core) | to be added |
| 4 | sa-cl5-custodian-2 | Portal technical user to connect to wallet. | Managed Wallets (Core) | to be added |
| 5 | sa-cl3-cx-1 | Portal technical user to connect GitHub and Semantic Hub. | Semantic Hub (Core) | to be added |
| 6 | sa-cl7-cx-5 | User for Portal to access BPDM for company address publishing to the BPDM process | BPDM Connect (Core) | to be added |
| 7 | **obsolete**<br>sa-cl6-cx-01 | DAPS connector registration | DAPS | to be added |
| 8 | sa-cl8-cx-1 | Technical User for Portal to SD | SD Factory (Core) | to be added |
| 9 | sa-cl2-01 | Technical User Clearinghouse update application | CH CX (3rd Party) | to be added |
| 10 | sa-cl2-02 | Technical User SelfDescription (SD) update application | SD Factory (Core) | to be added |
| 11 | sa-cl21-01 | Technical User used and owned by the platform operator to register discovery services| Discovery Finder (Core) | to be added |
| 11 | sa-cl22-01 | Technical User used and owned by the platform operator to access the owned BPN discovery services | BPN Discovery (Core) | to be added |


<br>
<br>




