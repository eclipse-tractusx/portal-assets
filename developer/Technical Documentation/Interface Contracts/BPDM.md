# Business Partner Data Management

<br>

## Interface Summary

BPDM Data Pool provides an API (Reference Data API) to lookup business partner data via REST endpoint "Lookup Business Partner". This endpoint provides access to several external data sources (trade registers, open data repositories, etc.)
<br>
API authentication is managed by API keys which is processed via HTTP header. This key manages also authorization, e.g., access to the CX data pool (instead of other community data).
<br>
<br>
For the registration process we are using the BPDM data call to pull the company basic data based on a BPNL data input.
<br>
<br>

## Architecture Overview

To integrate the API into CX onboarding process, portal team just have to call the lookup REST endpoint and transform the response into a pick list for the portal user.
<br>
<br>
<img width="791" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/24cbe6d4-3108-4292-9edf-6d8017ff9636">
<br>
<br>

## Description of the functional interface (WHAT)

Retrieving company data from the CX mirror.
<br>
<br>

## Description of the physical interfaces (HOW)

<br>
<img width="1200" alt="image" src="https://user-images.githubusercontent.com/94133633/210436060-929f9d50-0af3-47c7-aabd-16526f4dd7af.png">
<br>
<br>

### Service Call via BPN

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

#### Data Mapping for Company Data

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

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
