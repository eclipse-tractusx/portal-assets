# Business Partner Data Management

<br>

## Interface Summary

Business Partner Data of all business partners stored inside the catena-x data pool get visually displayed inside the partner network.
This document describes the details of the interface spec between BPDM and Portal product.
<br>
<br>

## Architecture Overview

<br>
<img width="955" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/portal-bpdm-backend-interaction.png">
<br>
<br>

## Description of the functional interface (WHAT)

Display business partner data via the partner network.
<br>
<br>

## Description of the physical interfaces (HOW)

<br>
n/a
<br>
<br>

### Get Business Partner data

<br>

```diff
! GET /api/catena/legal-entities/legal-addresses/search
```

#### Data Mapping for Company Data

to be added

<br>
<br>

#### Get Membership Flag

The endpoint provides all business partner numbers of those company records; where the company status is "ACTIVE" (means: company is part of the catena-x network).
Those bpns are mapped with the GET Business Partner Data response (see above) and a membership flag is added for matching companies inside the partner network user interface.
<br>

```diff
! GET /api/administration/partnernetwork/memberCompanies
```

#### Data Mapping for Company Data

to be added

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
