# Self Description

<br>

## Interface Summary

Gaia-X requires all providers to describe themselves and their service offerings using standardized, machine-readable metadata called Self-Descriptions. Such Self-Descriptions will for example include information like the address of a company, a specific service description or certificates and labels.
In the Catena-X context, those self-descriptions are implemented between the product Portal and SD Factory.
<br>
<br>
In the current implementation level, self-descriptions are considered in the following scenarios
<br>

- Onboarding / Registration of a company
- Registration of a connector
- Registration / Release of a new app or service
  <br>
  <br>
  In the document details below, those interfaces are described / explained.
  <br>
  <br>

## Architecture Overview

<br>
<img width="927" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/sdfactory-portal-interactions.png">
<br>
<br>

## Description of the functional interface (WHAT)

The Portal - SD Factory Interface is used to start generating process of signed self descriptions which are stored in json ld files.
The json ld file is supposed to get stored - for now normal db document storage linked to the self description owner (usually a company).
<br>
<br>

## Description of the physical interfaces (HOW)

Portal is pushing the self description via an REST API "POST" developed under the portal context.
Factory receives the information and transforms it to the self-description without signature. Then unsigned Self-Description is passed
to the Validation Service, which checks parameter values and signs Verifiable Credentials. This process is performed
asynchronously. The result is sent to the portal with an "content" section. The content section is getting stored as json file in the portal db.
<br>
<br>

## 1. Self Description Creation

For self descriptions, 2 different kinds of self descriptions are currently in scope.
Participants and services. In the section below both are explained.

### 1.1 Participant (Type of SD is "LegalPerson")

The participant self description is getting auto triggered with the CX member approval.
Following data are getting submitted to the factory to create the participant self description.

       JSON Body

       "type": "LegalPerson",

       "registration_number": "application id of the company, in future unique identifier",

       “headquarter_country”: "use the alpha2code of the company identity",

       ”legal_country”: "use the alpha2code of the company identity",

       “bpn”: "company bpn",

       “issuer”: "Catena-X bpn",

       “holder”: "Company bpn"

<br>
<br>
Endpoint: no specific endpoint, part of the portal internal logic, which will call the /selfdescription factory endpoint
<br>
<br>

### 1.2 Service (Type of SD is "ServiceOffering")

The service self description is currently only triggered for edcs with a limited content scope.
Following you can find the self description json. Same as for participant, there is no self-description endpoint available, the self description is triggered as part of an internal portal logic when registering the connector.

       JSON Body

       "type": "ServiceOffering",

       "providedBy": "participant sd document url",

       “aggregationOf”: "",

       ”termsAndConditions”: "link to AGB of Catena-X";  → to be clarified with Felix Gerbig (Werner Jost will request this),

       “policies”: "the policies declared in the EDC instance to be registered/onboarded" → to be clarified with Stefan Ettl (Werner Jost will request this),

       “issuer”: "Catena-X bpn",

       “holder”: "Company bpn"

<br>
<br>
Result: self description of the connector connected to the participant SD via the "provided_by" link.
The self description is stored inside the document table
<br>
<br>

## 2. Self Description Storage

Created self descriptions are stored against the company account inside the portal db "documents" with binary data.
The self-description can get published again when transferring the binary data into a json ld.
<br>
<br>
Storage logic:

- Documents are stored under a own document type "Self-Subscription..."
- With the storage of the document the status is set to "locked" => ensures that user can not easily delete it
- Connector SDs are additional linked to the respective connector, since a company could have multiple connectors
- User which triggered the SD creation is logged
  <br>
  <br>

## 3. Self Description Deletion

currently not supported
<br>
<br>

## 4. Self Description Discovery

currently not supported
<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
