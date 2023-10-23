## Clearinghouse
<br>

### Interface Summary

The Gaia-X Clearinghouse provides two key services

* trust (validation of corporate data by verifying data from legal entities, according to the Gaia-X Trust Framework)
* conformity assessment (SD Documents via teh compliance check)


<br>
<br>

### Architecture Overview
<br>

#### #1 Notarization Check

<br>
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/94133633/210450411-03a7c623-464c-4246-bdc9-460b98952af4.png">
<br>
<br>

#### #2 Compliance Check

The compliance check is used for legal entity SDs as well as connector SDs.
Both the flows are identical and displayed below:

<br>
<img width="1025" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/cba051a0-246f-494f-8dd9-db353904abc1">
<br>
<br>

### Authentication Flow / Details
<br>
<br>
<p align="center">
<img width="709" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/3d073212-45ee-47b4-8a4a-5561b3fccbcc">
</p>
<br>
<br>

### Description of the functional interface (WHAT) and the physical interfaces (HOW)
The Clearinghouse is triggered by the respective CX service (depending on the scenario by portal or SD Factory) and processes the data.
The response is provided back to the portal in both the cases.
Since the interface is asynchron - a response delay of 60 seconds have been agreed. In special cases it could take longer.

Endpoints used by the CH for response:

* /api/administration/registration/clearinghouse/selfDescription
* /api/administration/Connectors/clearinghouse/selfDescription

<br>
<br>

