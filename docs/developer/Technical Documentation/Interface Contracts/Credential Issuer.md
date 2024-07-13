## Credential Issuer Component

### Interface Summary

This interface contract specifies the interaction between the portal and the issuer component responsible for creating, managing, and revoking Self-Sovereign Identity (SSI) credentials within the Catena-X dataspace.

### Architecture Overview

The portal serves as the front-end interface through which users interact with the credential issuer component. The issuer component is a back-end service handling the lifecycle of credentials, such as creating, issuing, approving, rejecting, and revoking credentials. The component is accessible via RESTful APIs and integrates with Keycloak for authentication and authorization purposes.

### Authentication Flow / Details

Authentication is performed using OAuth 2.0, where clients must obtain a valid access token from Keycloak.

- **Token Endpoint**: Clients access Keycloak's token endpoint to obtain an access token.
- **Token Usage**: The access token is then included in the `Authorization` header as a Bearer token for subsequent API calls to the issuer component.

### Description of the Functional Interface (WHAT)

The issuer component provides the following functionalities:

- **Use Case Participation**: Retrieve all use case frameworks and the participation status of the acting company.
- **Certificates**: Get all company certificate requests and their statuses.
- **Certificate Types**: Obtain the certificate types for which the company can apply.
- **Credential Overview**: Fetch all outstanding, existing, and inactive credentials.
- **Owned Credentials**: List all outstanding, existing, and inactive credentials for the user's company.
- **Credential Creation**: Create various credentials such as BPN, membership, and framework.
- **Credential Approval/Rejection**: Approve or reject credentials, triggering the creation or revocation process.
- **Credential Revocation**: Allows the issuer or holder to revoke issued credentials.

### Description of the Physical Interface (HOW)

The RESTful API endpoints for interacting with the issuer component are as follows:

#### Credential Information Retrieval
- `GET /api/issuer/useCaseParticipation`
- `GET /api/issuer/certificates`
- `GET /api/issuer/certificateTypes`
- `GET /api/issuer`
- `GET /api/issuer/owned-credentials`
- `GET /api/credential/{credentialId}`
- `GET /api/credential/documents/{documentId}`

#### Credential Management
- `POST /api/issuer/bpn`
- `POST /api/issuer/membership`
- `POST /api/issuer/framework`
- `PUT /api/issuer/{credentialId}/approval`
- `PUT /api/issuer/{credentialId}/reject`

#### Credential Revocation
- `POST /api/revocation/issuer/credentials/{credentialId}`
- `POST /api/revocation/credentials/{credentialId}`

These endpoints must be exposed by the issuer component and accessible through HTTPS, ensuring secure communication.

### Authorization Details (Keycloak Technical User)

The issuer component integrates with Keycloak for fine-grained access control. Each endpoint is protected by specific roles and permissions assigned to technical users within Keycloak. Clients must possess the necessary roles to interact with the issuer component.

- **`revoke_credentials_issuer`**: Required for revocation endpoints (POST) by issuers.
- **`revoce_credential`**: Required for revocation endpoints (POST) by holders.
- **Permissions For Other Endpoints**: Specific roles must be created and assigned to users for managing credentials (GET, POST, PUT).

For each action taken through the interface, a corresponding Keycloak role must be mapped and validated to ensure proper authorization and to prevent unauthorized access or actions.

### Endpoint Responses

Each endpoint should provide appropriate HTTP status codes as feedback to the user for the action taken. These include:

- `200 OK`: Successful operation.
- `400 Bad Request`: Invalid request format or parameters.
- `401 Unauthorized`: Authentication required or failed.
- `403 Forbidden`: Insufficient permissions.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected condition encountered.

<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
