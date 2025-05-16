# Offer Autosetup

The offer autosetup is used to:

- enable app/service provider to configure and activate the offer subscription triggered by an customer
- the service offers two possibilities:
  - either automate the full flow; or
  - run it via any UI

In the page below the functional details and technical implementation possibilities are explained.

## Architecture Overview

### Highlevel Architecture picture

<img width="756" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-service-subscription-flow.png">

<br>
<br>

## Integration

Every offer provider (app as well as service) can integrate to the autosetup interface by executing following steps

1. Configure your company internal service/app ramp-up service
2. The autosetup flow

<br>

### 1. Configure Your Company’s Internal Service/App Ramp-Up Endpoint

The portal allows users with the “Offer Management” permission to configure the endpoint used for ramping up company services and apps. This can be done through the UI or via API.

**Endpoint**: .../api/administration/subscriptionconfiguration/owncompany
**Method**: PUT
**Request Body**:

```json
{
  "url": "string"[required](url being called during execution of TRIGGER_PROVIDER),
  "callbackUrl": "string"[optional] (url being called during TRIGGER_PROVIDER_CALLBACK, optional),
  "authUrl": "string"[required] (authentication provider token url to generate token for above url and callback url),
  "clientId": "string"[required] (client id to generate the token from above auth  url),
  "clientSecret": "string"[required] (secret to generate the token from above auth  url)
}
```

**Description**:
This API stores the auto-setup URL (url) and optional callback URL (callbackUrl) for service and app partners. It is accessible only to companies with the “App Provider” or “Service Provider” role. For details on changing company roles, refer to the [Change Company Role](/docs/user/02.%20Technical%20Integration/05.%20Company%20Role/Change%20Company%20Role.md) guide.

- On the first call, the provided URL is saved as the app/service provider’s endpoint.
- Subsequent calls overwrite the existing configuration stored for auto setup.

#### Delete the auto setup configuration

To delete the auto setup configuration user needs to call the below api or click on Delete button in UI with same set of permission which is required to set the url.
When a URL is deleted, any ongoing auto-setup steps of type `TRIGGER_PROVIDER_CALLBACK` in `TODO` status will be marked as `DONE`, and a new `AWAIT_START_AUTOSETUP` step will be created with `TODO` status.

**Path**: .../api/administration/subscriptionconfiguration/owncompany  
**Method**: DELETE  
**Request Body**: No request body

**Auth**: can get triggered by user with the role App Manager; Service Manager and technical users with the role "Offer Management"

##### UI Flow Details:

![AuthenticationProtocol](/docs/static/register-url-popup.png)
<br>
<br>

After the endpoint is configured, all customer service/app subscription will trigger automatically the company configured endpoint (property "url" of endpoint /api/administration/subscriptionconfiguration/owncompany) with the following data:

```
{
  "customer" :
    {
      "organizationName": "companyName"[required] ,
      "country": "company country alpha2code" [required],
      "email": "user email address which triggered the service" [required]
    }
  "properties":
    {
      "bpnNumber": "bpn of the company" [required],
      "subscriptionId": "" [required],
      "serviceId": "" [required]
    }
}
```

### 2. The autosetup flow

After the customer request including the customer data for service/app setup got provided to the offer provider, the offer provider is now supposed to:

- validate the request
- ramp-up & configure the service/app
- activate the subscription request of the customer

For the _ramp-up and configuration_ likely a technical user might be needed to (e.g. connect to a central provided service such as dataspace discovery, bpdm-pool, etc.). Since the offer provider did define the technical user needed profile in the app/service release process, the pre-saved configuration profile will be used now to create the technical user.
The app/service provider is responsible to secure the technical user credentials carefully. The technical user is a critical element since this technical user is created on the behalf of the customer (means: the technical user claims are connected to the customer identity - this is mandatorily needed since the customer is the actual acting identity of the service/app - and not the app/service provider).

The app/service provider is supposed to call the endpoint which triggers the automatic creation of all app/service instance relevant information. Therefore 2 endpoints are available

- POST /api/Apps/autoSetup (deprecated - still supported till 25.08.)
- POST /api/Apps/start-autoSetup

#### Details of POST /api/Apps/autoSetup

**Path**: .../api/Apps/autoSetup  
**Method**: POST  
**Description**: Post service request is used to create the customer service/app instance inside the portal db.  
With the successful client/app instance creation on the portal side, the technical user for the AAS registry will get send within the response.  
**Auth**: can get triggered by users‚ with the role App Manager; Service Manager and technical users with the role "Offer Management"

**Request Body**:

```
{
  "requestId": "string" (service request id),
  "appUrl": "string" (service provider endpoint / client / app)
}
```

##### API Endpoint Logic

- Validate if requestId is existing in app_subscription table
- Validate if user calling the endpoint is registered as service provider of the service/app
- Validate if the subscription is in status "PENDING"
  - if yes, proceed
  - if no, error
- Run client name creation (logic needed - similar like the service account logic implemented by Norbert; but in this case for the client itself) - ideally naming convention should be something like Cl-{AppName}-{CustomerName}
- Add app instance and client for the customer and app id in following tables
  - iam_client table
  - app_instance table
- Next, create the client in Keycloak central IdP - setting

  - Client ID: {client name defined by the service before}
  - Access Type: {public, might get auto set, please check}
  - Standard Flow Enabled: true
  - Direct Access Grants Enabled: true
  - Valid Redirect URIs: {url send via the request body, likely a "\*" needs to get added}
  - Web Origins: "+"
  - Backchannel Logout Session Required: true
  - Full Scope allowed: false

- now add roles to the same client by using the roles stored inside user_roles in the portal db and linked to the respective app for which the instance got created
- Create the technical user for the service, by creating another client with following settings

  - Client ID: {ideally client name + prefix "sa-"}
  - Access Type: {confidential}
  - Standard Flow Enabled: false
  - Direct Access Grants Enabled: false
  - Service Accounts Enabled: true
  - Backchannel Logout Session Required: true

  - Full Scope allowed: true
  - Service Account Roles: select the service account role "Digital Twin Management" of the client "technical_roles_management"

- add to the technical user the bpn as attribute (bpn of the customer) and the bpn mapper inside the client. Config see attachment
- store technical user data inside portal db => description "Technical User for app {app name} - {techUserRoleName}"
- Technical user to be mapped to the customer company id
- Back inside the portal db, update the service/app status in the app_subscription table from "PENDING" to "ACTIVE"
- Create Notifications
  - customer notification to inform the customer company about the technical user creation via the service provider. (receiver: customer IT admin)
  - customer notification to inform the customer company about the activated app/service (receiver: customer app requester, customer IT admin)

**Response Body**:

```
{
  "technicalUserInfo": [
    {
      "technicalUserId": "string"    (guid, id of the technical user),
      "technicalUserPermissions": [
        "string"                     (permissions that were assigned to the given technicalUserId)
      ],
      "technicalUserSecret": "string", (secret of the technical user)
      "technicalClientId": "string" (clientId of the technical user)
    }
  ],
  "clientInfo":
    {
      "clientId": "clientId of the app-instances keycloak-client",
      "clientUrl": "url of the app-instance"
    }
}
```

#### Details of POST /api/apps/start-autoSetup

As an functional extension and more app/service provider centric approach, the endpoint /api/apps/start-autoSetup got developed which is providing:

- process worker used to setup offer provider relevant objects and user notifications
- in case of system errors or process issues, data loss is prevented by using temp data storage and automatic retriggering of processes

<br>

**Path**: .../api/apps/start-autoSetup  
**Method**: POST  
**Description**: ...  
**Auth**: can get triggered by users with the role App Manager; Service Manager and technical users with the role "Offer Management"  
**Request Body**:

```
{
  "requestId" (service request id),
  "offerUrl" (service provider endpoint / client / app)
}
```

**Response**: empty

Compared to the deprecated endpoint mentioned above, the /start-autosetup is a asynchronous endpoint working with process steps (as defined below).
The respective process-flow is documented [here](../../09.%20Process%20Workers/07.%20offer_subscription.md)

#### Details of PUT /api/apps/subscription/{subscriptionId}/activate

Endpoint an app-provider is supposed to call to confirm the final activation of the subscription. This stepp will enable the client and technical users that have been created and set the apps status to ACTIVE.

**Request Body**: empty  
**Response**: empty

#### Details of execution of offerproviders callback url POST <callbackUrl>

**Request Body**:

```
{
  "technicalUserInfo": [
    {
      "technicalUserId": "string"    (guid, id of the technical user),
      "technicalUserSecret": "string", (secret of the technical user)
      "technicalClientId": "string" (clientId of the technical user)
    }
  ],
  "clientInfo":
    {
      "clientId": "clientId of the app-instances keycloak-client"
    }
}
```

## Checklist Worker

| Process Step                                         | Initiated by..                                                                      | Description                                                                                                                                                        | Success Scenario                                                                                                                 | Error (process_step status FAILED)         | Auto Retrigger?                                     | Manual Retrigger?                                                                       | Possible Following Steps                        |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 100<br>Trigger Provider                              | Automatically by the portal application                                             | Subscription Record creation in "PENDING" <br>Portal triggers the Offer Provider URL (if provider url is stored)                                                   | If the provider endpoint is responding with 20x <br>the process step will get set to "DONE" and "SKIPPED" if no URL is available | ??                                         | Yes, in case of an 5xx                              | Yes, in case of an 400 (wrong content) 404 (wrong url)                                  | Multi Instance: #101 <br> Single Instance: #103 |
| 101<br>Start Autosetup                               | By the provider by running .../api/apps/start-autoSetup                             | Provider is triggering the portal autosetup endpoint with necessary offer details<br>the step will trigger the portal internal autosetup jobs (102, 103, 104, 105) | The process step is set to "DONE" <br>with successful endpoint request body (which is getting stored in a temp table)            | -                                          | -                                                   | Step stays on "TO_DO" till the endpoint got successfully triggered (content is correct) | Apps: #102 <br>Services: #104                   |
| 102<br>OfferSubscription Client Creation             | Automatically by the portal application                                             | Created app client in Keycloak and DB, additionally app instance is getting created                                                                                | The process step is set to "DONE" <br>after all records are created                                                              | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by Keycloak                  | Yes, in case of an 4xx by Keycloak                                                      | #104 <br>#105                                   |
| 103<br>Single Instance Subscription Details Creation | By the provider by running ?????                                                    | Single Instance Subscription Details Creation                                                                                                                      | The process step is set to "DONE" <br>as soon as the url and instance is linked                                                  |                                            | -                                                   | -                                                                                       | #105                                            |
| 104<br>Offer Subscription Technical User Creation    | Automatically by the portal application                                             | Technical User creation in Keycloak and metadata storage in portal db, additionally notification creation with technical client id                                 | The process step is set to "DONE" <br>after technical user ot successfully created                                               | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by Keycloak                  | Yes, in case of an 4xx by Keycloak                                                      | #105                                            |
| 105<br>Activate Subscription                         | By the provider by running .../api/apps/subscription/{offerSubscriptionId}/activate | Subscription record activation, notification creation and send email.                                                                                              | The process step is set to "DONE" <br>after xxx                                                                                  | xxx                                        | Yes, in case of an 5xx for the email - auto "TO_DO" | -                                                                                       | Multi Instance: #106 <br> Single Instance: -    |
| 106<br>Trigger Provider Callback                     | Automatically by the portal application if callbackUrl is configured                | Trigger provider callback url to share client and tech user.                                                                                                       | The process step is set to "DONE" <br>after xxx                                                                                  | xxx                                        | Yes, in case of an 5xx                              | Yes, in case of an 4xx                                                                  | -                                               |

For the app provider, following steps are needed to connect to this endpoint in the respective needed manner:
Due to the process worker/asynchronous setup of the process, the provider needs to connect to two additional endpoints to be able to fetch the status as well as the needed information for the application setup

- GET /api/Apps/{appId}/subscription/{subscriptionId}/provider
  - Used to watch the autosetup status via the property "processStepTypeId" as well as the technicalUserID which is needed to call the technical user credentials (next endpoint)
- GET /api/administration/serviceaccount/owncompany/serviceaccounts/{serviceAccountId}
  - Used to fetch the specific app tenant created technical user credentials by adding the "serviceAccountId" (aka technicalUserId) fetched via the endpoint of GET /api/Apps/{appId}/subscription/{subscriptionId}/provider
- PUT /subscription/{subscriptionId}/activate
  - Needed to run at the end of the customer tenant/instance configuration the activation of the subscription which will also initiate the customer information and sharing the tenantUrl

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
