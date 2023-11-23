## Business Partner Data Management

<br>

Business Partner Data Management as a product as well as the portal have three different interfaces:

- [Search Existing Business Partners](/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#search-existing-business-partners)
- [Push New Business Partners](/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#push-new-business-partners)
- [Pull New Business Partner BPNL](/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#pull-new-business-partners)
- [Partner Network Connect](/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#partner-network-connect)

<br>
<br>

Below the respective touched business process steps are highlighted to enable an easier mapping of the interfaces to the portal product business process:

<p align="center">
<img width="843" alt="image" src="/docs/static/bpdm-touchpoints.png">
</p>

<br>
<br>

## Search existing Business Partners

(via Golden Record) via the BPNL (used inside the registration application/form)

### Interface Summary

BPDM Data Pool provides an API (Reference Data API) to lookup business partner data via REST endpoint "Lookup Business Partner". This endpoint provides access to several external data sources (trade registers, open data repositories, etc.)
<br>
API authentication is managed by API keys which is processed via HTTP header. This key manages also authorization, e.g., access to the CX data pool (instead of other community data).
<br>
<br>
For the registration process we are using the BPDM data call to pull the company basic data based on a BPNL data input.
<br>
<br>

-> Authentication: the authorization is triggered by the acting FE users token  
-> Endpoint: BPDM endpoint is covered by a portal endpoint which is used to request the data and transfer the response into the needed format (portal endpoint: GET /api/registration/legalEntityAddress/{bpn} ; bpdm endpoint: https://business-partners.{env}.demo.catena-x.net/pool/api/catena/legal-entities/{idValue})

<br>
<br>

### Architecture Overview

To integrate the API into CX onboarding process, portal team just have to call the lookup REST endpoint and transform the response into a pick list for the portal user.
<br>
<br>
<img width="904" alt="image" src="/docs/static/bpdm-golden-record-overview.png">
<br>
<br>

### Description of the functional interface (WHAT)

Retrieving company data from the CX mirror.
<br>
<br>

### Description of the physical interfaces (HOW)

<br>
<img width="1200" alt="image" src="/docs/static/bpdm-physical-interfaces.png">
<br>
<br>

#### Service Call via BPN

<br>

```diff
! GET /api/catena/business-partner/{idValue}
```

<br>

Request Body
<br>

    idValue: {BPN-Number},
    idType: BPN

<br>
<br>

The mentioned endpoint is provided by the registration service.
Behind that, the BPDM endpoint {BPDM Host}/pool/api/catena/legal-entities/{idValue} is getting called.
The portal is using an technical user for the authentication. The technical user bearer token is send via the api rest call to bpdm.

<br>
<br>

##### Data Mapping for Company Data

<br>

| Data Field Name Portal | Data Field on CX Data Pool                 | Example            |
| ---------------------- | ------------------------------------------ | ------------------ |
| BPN                    | "bpn": (first response line)               | BPNL0MVP000000Q7   |
| Organization Name      | "names": [ { "value}]                      | German Car Factory |
| Registered Name        | "names": [ { "value}]                      | German Car Factory |
| International Name     | "names": [ { "value}]                      | German Car Factory |
| Street & House Number  | addresses "country": [ { "technicalKey":}] | DE                 |
| Country                | addresses "postCodes": [ { "value":}]      | 80809              |
| Postal Code            | addresses "localities": [ { "value":}]     | Munich             |

<br>
<br>

## Push new Business Partners

(into the Golden Record via a Gate) to trigger the BPNL creation for the new registering party (used along the application approval process of the portal)

### Interface Summary

The interface is used to submit the new party registration company data via the BPDM Gate to the Golden Record set.
The Golden Record has a couple of implemented validations to validate the registering party and the respective data and (in case of a successful validation) approve the record to be a valid record and a BPNL is getting created.

<br>
<br>

-> Authentication: technical user  
-> Endpoint: n/a

<br>
<br>

### Architecture Overview

<br>
<br>

<p align="center">
<img width="821" alt="image" src="/docs/static/bpdm-process-worker.png">
</p>

<br>
<br>

### Description of the functional interface (WHAT)

Publishing company data of a to be registered CX member to the Golden Record
<br>
<br>

### Description of the physical interfaces (HOW)

n/a
<br>
<br>

#### Service Call Details

The call itself is not a API triggered call but automated by the process worker.
However the administrator of the platform has the chance to retrigger the process in the scenario of an failure.

```diff
! POST /api/administration/registration/application/{applicationId}/trigger-bpn
```

<br>

Request Body
<br>

    n/a

<br>
<br>

##### Data Submission Details

<br>

- Company Name
- ExternalId
- Company Short Name
- Company Identifiers
- Country
- Zip Code
- City
- Street Name
- Street Number
- Region

<br>
<br>

## Pull new Business Partner BPNL

(from the Golden Record via a Gate) to fetch the new created BPNL or the process error details for the new registering party (used along the application approval process of the portal)

### Interface Summary

The interface is used to fetch the BPN of the previously submitted party registration request via the BPDM Gate and the Golden Record db.

<br>
<br>

-> Authentication: technical user  
-> Endpoint: GET https://business-partners.{env}.demo.catena-x.net/companies/test-company/api/catena/sharing-state?page=0&size=10&businessPartnerType=LEGAL_ENTITY&externalIds={externalId}

<br>
<br>

### Architecture Overview

<p align="center">
<img width="803" alt="image" src="/docs/static/bpdm-process-worker-pull.png">
</p>

<br>
<br>

### Description of the functional interface (WHAT)

Fetching the (if available) newly created Business Partner Number (BPN) of the to be registered CX member to process the application registration request.
<br>
<br>

### Description of the physical interfaces (HOW)

n/a
<br>
<br>

#### Service Call Details

The call itself is not a API triggered call but automated by the process worker.
However the administrator of the platform has the chance to retrigger the process in the scenario of an failure.

```diff
! POST /api/administration/registration/application/{applicationId}/trigger-bpn
```

<br>

Request Body
<br>

        {
            "totalElements": 1,
            "totalPages": 1,
            "page": 0,
            "contentSize": 1,
            "content": [
                {
                    "businessPartnerType": "LEGAL_ENTITY",
                    "externalId": "{portal application ID}",
                    "sharingStateType": "{status e.g. SUCCESS}",
                    "sharingErrorCode": null,
                    "sharingErrorMessage": null,
                    "bpn": "{BPNL if sharingProcess is finished; otherwise null}",
                    "sharingProcessStarted": "{date}",
                    "taskId": null
                }
            ]
        }

<br>
<br>

## Partner Network

### Interface Summary

Business Partner Data of all business partners stored inside the catena-x data pool get visually displayed inside the partner network.
This document describes the details of the interface spec between BPDM and Portal product.
<br>
<br>

-> Authentication: the authorization is triggered by the acting FE users token  
-> Endpoint: BPDM GET /api/catena/legal-entities/legal-addresses/search & Portal GET /api/administration/partnernetwork/memberCompanies

<br>
<br>

### Architecture Overview

<p align="center">
<img width="780" alt="image" src="/docs/static/bpdm-partner-network.png">
</p>

<br>
<br>

### Description of the functional interface (WHAT)

Display business partner data via the partner network.
<br>
<br>

### Description of the physical interfaces (HOW)

n/a
<br>
<br>

#### Get Business Partner data

```diff
! GET /api/catena/legal-entities/legal-addresses/search
```

<br>
<br>

##### Get Membership Flag

The endpoint provides all business partner numbers of those comapny records; where the company status is "ACTIVE" (means: company is part of the catena-x network).
Those bpns are mapped with the GET Business Partner Data response (see above) and a membership flag is added for matching companies inside the partner network user interface.
<br>

```diff
! GET /api/administration/partnernetwork/memberCompanies
```

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
