## Categories of Data

The CX Portal & Network Services system stores different types of data in the same database: the master / static data, business base data, as well as the transaction data. Therefore, we need to classify all data / entities of CX into the following groups:

<br>
<p align="center">
<img width="507" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/data-layers.png">
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

- Agreement
  - Category
  - Consent Status
- Application
  - Invitation Status
  - Checklist State
  - Checklist Type
  - Company Application Status
  - Process Step Status
  - Process Step Type
- Countries
- Language
- Company
  - Status
  - Role
  - BPDM Identifier
  - Unique Identifier
- User
  - Status
- Service Account
  - Status
  - Type
- Connector
  - Status
  - Type
- Document
  - Status
  - Type
- Identity Provider Status
- Notification
  - Type
  - Topic
- Offer
  - Status
  - Type
  - Subscription Status
  - Service Type
- Privacy Policy
- Verified Credentials
  - Type
  - Kind
- Use Case Paricipation
  - Status

<br>
<br>

## Transactional Data

- Invitation
- Companies
- Users
- Service Accounts
- Identity provider
- Connectors
- Offer
- Subscription
- App Instance
- Company Ssi Details
- etc.

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
