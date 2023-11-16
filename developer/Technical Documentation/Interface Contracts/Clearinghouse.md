## Clearinghouse
<br>

* [Legal Participant Self Description Creation](/developer/Technical%20Documentation/Interface%20Contracts/Clearinghouse.md#1-notarization-check)
* [Connector/Service Self Description Creation](/developer/Technical%20Documentation/Interface%20Contracts/Clearinghouse.md#2-compliance-check)

<br>
<br>

### Interface Summary

The Gaia-X Clearinghouse provides two key services

- trust (validation of corporate data by verifying data from legal entities, according to the Gaia-X Trust Framework)
- conformity assessment (SD Documents via teh compliance check)
<br>

Below the respective touched business process steps are highlighted to enable an easier mapping of the interfaces to the portal product business process:

<p align="center">
<img width="843" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/520ca8f9-488a-4227-8a3b-0ed573dee210">
</p>

<br>
<br>

### Architecture Overview

<br>

#### #1 Notarization Check

<br>

<p align="center">
<img width="857" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/597fd45f-cc99-481e-a8d3-875922b23905">
</p>

<br>
<br>

#### #2 Compliance Check

The compliance check is used for legal entity SDs as well as connector SDs.
Both the flows are identical and displayed below:

<br>

<p align="center">
<img width="857" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/cba051a0-246f-494f-8dd9-db353904abc1">
</p>

<br>
<br>

### Authentication Flow / Details

<br>
<br>

<p align="center">
<img width="709" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/3d073212-45ee-47b4-8a4a-5561b3fccbcc">
</p>

Two technical users are created to allow the clearinghouse to access the available services:
* sa-cl2-01 (for the notarization service response)
* sa-cl2-02 (for the compliance sd submission)

<br>
<br>

### Description of the functional interface (WHAT) and the physical interfaces (HOW)

The Clearinghouse is triggered by the respective CX service (depending on the scenario by portal or SD Factory) and processes the data.
The response is provided back to the portal in both the cases.
Since the interface is asynchron - a response delay of 60 seconds have been agreed. In special cases it could take longer.

Endpoints used by the CH for response:

- /api/administration/registration/clearinghouse
- /api/administration/registration/clearinghouse/selfDescription
- /api/administration/Connectors/clearinghouse/selfDescription

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam
