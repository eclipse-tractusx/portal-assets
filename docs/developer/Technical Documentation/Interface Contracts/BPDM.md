## Business Partner Data Management

<br>

Business Partner Data Management as a product as well as the portal have three different interfaces:

- [Search Existing Business Partners](/docs/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#search-existing-business-partners)
- [Push New Business Partners](/docs/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#push-new-business-partners)
- [Pull New Business Partner BPNL](/docs/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#pull-new-business-partners)
- [Partner Network Connect](/docs/developer/Technical%20Documentation/Interface%20Contracts/BPDM.md#partner-network-connect)

<br>
<br>

Below the respective touched business process steps are highlighted to enable an easier mapping of the interfaces to the portal product business process:

<p align="center">
<img width="843" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-touchpoints.png">
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
<img width="904" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-golden-record-overview.png">
<br>
<br>

### Description of the functional interface (WHAT)

Retrieving company data from the CX mirror.
<br>
<br>

### Description of the physical interfaces (HOW)

<br>
<img width="1200" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-physical-interfaces.png">
<br>
<br>

#### Service Call via BPN

<br>

```diff
! GET /api/registration/legalEntityAddress/{bpn}
```

<br>

Request Body
<br>

n/a

<br>
<br>

The mentioned endpoint is provided by the registration service and acts as a kind of an mapper fro the actual BPDM endpoint.
The BPDM endpoint which is getting called by the portal api path is the following `{BPDM Host}/pool/api/catena/legal-entities/{idValue}`with the following body

<br>

    idValue: {BPN-Number},
    idType: BPN

<br>
<br>

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

###### Special Scenario: Unique Identifier

The BP-Pool includes the registration member's unique identifier, but it does not directly correspond to the supported identifiers in the portal. The portal only supports Gaia-X compliant identifiers, which are reduced to GX Unique ideas. To address this, a mapping table has been created within the portal.

In cases where a BPDM unique identifier does not have a corresponding portal key mapped, the user will not receive an ID. In such scenarios, the front-end (FE) will prompt the user to manually select an ID type and enter the corresponding value.

| BPDM Key                              | Country Code (for BPDM Key) | Portal Key            |
| ------------------------------------- | --------------------------- | --------------------- |
|       "technicalKey": "CX_POOL_ID",   | -                           | -                     |
|       "technicalKey": "EU_VAT_ID_DE", | DE                          | VAT_ID                |
|       "technicalKey": "CDQID",        | -                           | -                     |
|       "technicalKey": "BPN",          | -                           | -                     |
|       "technicalKey": "BR_CNPJ",      | -                           | -                     |
|       "technicalKey": "BR_TAX_STATE", | ??                          | VAT_ID                |
|       "technicalKey": "BR_TAX_MUN",   | ??                          | VAT_ID                |
|       "technicalKey": "CH_UID",       | CH                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "EU_VAT_ID_FR", | FR                          | VAT_ID                |
|       "technicalKey": "FR_SIRET",     | -                           | -                     |
|       "technicalKey": "FR_SIREN",     | FR                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "EU_VAT_ID_AT", | AT                          | VAT_ID                |
|       "technicalKey": "DE_TAX_ID",    | -                           | -                     |
|       "technicalKey": "DE_BNUM",      | DE                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "DUNS_ID",      | -                           | -                     |
|       "technicalKey": "CZ_ICO",       | CZ                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "EU_VAT_ID_CZ", | CZ                          | VAT_ID                |
|       "technicalKey": "CX_BPN",       | -                           | -                     |
|       "technicalKey": "string",       | -                           | -                     |
|       "technicalKey": "ABN_AU",       | -                           | -                     |
|       "technicalKey": "PL_NIP",       | -                           | -                     |
|       "technicalKey": "EU_VAT_ID_PL", | PL                          | VAT_ID                |
|       "technicalKey": "US_EMPL_ID",   | -                           | -                     |
|       "technicalKey": "EU_VAT_ID_BE", | BE                          | VAT_ID                |
|       "technicalKey": "EU_VAT_ID_CH", | CH                          | VAT_ID                |
|       "technicalKey": "EU_VAT_ID_DK", | DK                          | VAT_ID                |
|       "technicalKey": "EU_VAT_ID_ES", | ES                          | VAT_ID                |
|       "technicalKey": "EU_VAT_ID_GB", | GB                          | VAT_ID                |
|       "technicalKey": "EU_VAT_ID_NO", | NO                          | VAT_ID                |
|       "technicalKey": "GS1_GLN",      | -                           | -                     |
|       "technicalKey": "LEI_ID",       | all                         | LEI_CODE              |
|       "technicalKey": "BR_ID_AT",     | -                           | -                     |
|       "technicalKey": "BE_ENT_NO",    | BE                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "CVR_DK",       | DK                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "CIF_ES",       | -                           | -                     |
|       "technicalKey": "ID_CRN",       | GB                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "NO_ORGID",     | NO                          | COMMERCIAL_REG_NUMBER |
|       "technicalKey": "PL_REG",       | -                           | -                     |

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
<img width="821" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-process-worker.png">
</p>

<br>
<br>

### Description of the functional interface (WHAT)

Publishing company data of a to be registered CX member to the Golden Record via the Gate
<br>
<br>

### Description of the physical interfaces (HOW)

n/a
<br>
<br>

#### Service Call Details

The call itself is not a API triggered call but automated by the process worker.
The portal process worker calls the following endpoints to store the new registration business partner company data

```diff
! PUT /companies/test-company/api/catena/input/business-partners
```

> **_NOTE:_** Field ownCompanyData gets set to "true"

As soon as the data are published, the job runs the endpoint to trigger the bpnl creation

```diff
! POST: /companies/test-company/api/catena/sharing-state/ready
```

<br>
<br>

##### Data Submission Details

<br>

PUT /companies/test-company/api/catena/input/business-partners:

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

POST: /companies/test-company/api/catena/sharing-state/ready

- External Id

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
<img width="803" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-process-worker-pull.png">
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
! GET /companies/test-company/api/catena/sharing-state?externalIds={externalId}
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
                    "businessPartnerType": "GENERIC",
                    "externalId": "{portal application ID}",
                    "sharingStateType": "{status e.g. SUCCESS}",
                    "sharingErrorCode": null,
                    "sharingErrorMessage": null,
                    "bpn": "{BPNA if sharingProcess is finished; otherwise null}",
                    "sharingProcessStarted": "{date}",
                    "taskId": {uuid}
                }
            ]
        }

<br>
<br>

After this call was made and the portal receives a SUCCESS response it will trigger the next call to receive the BPNL of the entry, since the `GET /companies/test-company/api/catena/sharing-state?externalIds={externalId}` call only returns the BPNA for the generic types.

```diff
! POST: /companies/test-company/api/catena/output/business-partners/search
```

the post will contain the externalId of the previous call. The request will look like the following:

Request Body
{
"totalElements": 1,
"totalPages": 1,
"page": 0,
"contentSize": 1,
"content": [
{
"externalId": "{portal application ID}",
"nameParts": [
"Name of the company"
],
"identifiers": [
{
"type": "EU_VAT_ID_DE",
"value": "DExxxxxxxx",
"issuingBody": null
}
],
"states": [],
"roles": [],
"isOwnCompanyData": false,
"legalEntity": {
"legalEntityBpn": "(This is the value we take for the bpnl)",
"legalName": "Name of the company",
"shortName": "Name of the company",
"legalForm": null,
"classifications": [],
"confidenceCriteria": {
"sharedByOwner": false,
"checkedByExternalDataSource": false,
"numberOfBusinessPartners": 1,
"lastConfidenceCheckAt": "2024-01-26T11:35:30.013377",
"nextConfidenceCheckAt": "2024-01-31T11:35:30.013381",
"confidenceLevel": 0
}
},
"site": null,
"address": {
"addressBpn": "(this is the bpna we receive from the previous call)",
"name": null,
"addressType": "AdditionalAddress",
"physicalPostalAddress": {
"geographicCoordinates": null,
"country": "DE",
"administrativeAreaLevel1": null,
"administrativeAreaLevel2": null,
"administrativeAreaLevel3": null,
"postalCode": "xxxxx",
"city": "xxxx",
"district": null,
"street": {
"namePrefix": null,
"additionalNamePrefix": null,
"name": "Test str",
"nameSuffix": null,
"additionalNameSuffix": null,
"houseNumber": null,
"houseNumberSupplement": null,
"milestone": null,
"direction": null
},
"companyPostalCode": null,
"industrialZone": null,
"building": null,
"floor": null,
"door": null
},
"alternativePostalAddress": {
"geographicCoordinates": null,
"country": null,
"administrativeAreaLevel1": null,
"postalCode": null,
"city": null,
"deliveryServiceType": null,
"deliveryServiceQualifier": null,
"deliveryServiceNumber": null
},
"confidenceCriteria": {
"sharedByOwner": false,
"checkedByExternalDataSource": false,
"numberOfBusinessPartners": 1,
"lastConfidenceCheckAt": "2024-01-26T11:35:30.013377",
"nextConfidenceCheckAt": "2024-01-31T11:35:30.013381",
"confidenceLevel": 0
}
},
"createdAt": "2024-01-26T14:27:00.140930Z",
"updatedAt": "2024-01-26T14:27:00.140935Z"
}
]
}

### Workaround Solution - in case BPNL is down

In case the BPDM interface is not enabled or runs into unexpected system downtime, the operator got enabled to set the BPNL manually for the registration request via the "Application Request" board.
The endpoint enabled to set the BPNL manually:

```diff
! POST /api/administration/registration/application/{applicationId}/{bpn}/bpn
```

<br>

Request Body
<br>

    n/a

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
<img width="780" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/bpdm-partner-network.png">
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
