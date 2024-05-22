# Offer Autosetup

The offer autosetup is used to:

- enable app/service provider to configure and activate the offer subscription triggered by an customer
- the service offers two possibilities:
  - either automate the full flow; or
  - run it via any UI

In the page below the functional details and technical implementation possibilities are explained.

## Architecture Overview

### #1 Highlevel Architecture picture

<img width="756" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-service-subscription-flow.png">

<br>
<br>

## Integration

Every offer provider (app as well as service) can integrate to the autosetup interface by executing following steps

1. Configure your company internal service/app ramp-up service
2. ...
3. ...

<br>
<br>

### #1 Configure your company internal service/app ramp-up service

The portal provides via the UI as well as callable by technical users with the permission configuration of "Offer Management" the possibility to configure the offer company endpoint used to ramp-up the services/apps offered by the company.

**Path**: .../api/administration/serviceprovider/owncompany  
**Method**: PUT  
**Description**: Store the service partner/app partner autosetup url. The endpoint is only available for companies with the company role app provider/service provider. Company Role change process is defined under the following link [Change Company Role](/docs/user/02.%20Technical%20Integration/05.%20Company%20Role/Change%20Company%20Role.md)  
With the first time calling the endpoint; the url will be set as app/service provider endpoint as a new data set.  
With any further endpoint triggers; the existing record will get overwritten. Means; the app/service provider can have only one endpoint configured.  
**Auth**: can get triggered by user with the role App Manager; Service Manager and technical users with the role "Offer Management"

<br>
<br>

##### UI Flow Details:

<img width="600" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/register-url-popup.png">

<br>
<br>

After the endpoint is configured, all customer service/app subscription will trigger automatically the company configured endpoint with the following data:

<br>

          [
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
          ]

<br>
<br>

### #2 The autosetup flow

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

Request Body
<br>

          [
           {
             requestId (service request id),
             appUrl (service provider endpoint / client / app)
           }
          ]

<br>

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

<br>
<br>

Response Body
<br>

          {
             technicalUserId,
             technical user secret
           }

<br>
<br>

#### Details of POST /api/Apps/start-autoSetup

As an functional extension and more app/service provider centric approach, the endpoint /api/Apps/start-autoSetup got developed which is providing:

- process worker used to setup offer provider relevant objects and user notifications
- in case of system errors or process issues, data loss is prevented by using temp data storage and automatic retriggering of processes

<br>

**Path**: .../api/Apps/start-autoSetup  
**Method**: POST  
**Description**: ...
**Auth**: can get triggered by users with the role App Manager; Service Manager and technical users with the role "Offer Management"

Request Body
<br>

          [
           {
             requestId (service request id),
             appUrl (service provider endpoint / client / app)
           }
          ]

<br>

Compared to the deprecated endpoint mentioned above, the /start-autosetup is a asynchronous endpoint working with process steps (as defined below)

<br>

## Checklist Worker

| Process Step                                         | Initiated by..                                                                                      | Description                                                                                                                                                        | Success Scenario                                                                                                                 | Error (process_step status FAILED)         | Auto Retrigger?                                     | Manual Retrigger?                                                                       | Possible Following Steps                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 100<br>Trigger Provider                              | Automatically by the portal application                                                             | Subscription Record creation in "PENDING" <br>Portal triggers the Offer Provider URL (if provider url is stored)                                                   | If the provider endpoint is responding with 20x <br>the process step will get set to "DONE" and "SKIPPED" if no URL is available | ??                                         | Yes, in case of an 5xx                              | Yes, in case of an 400 (wrong content) 404 (wrong url)                                  | Multi Instance: #101 <br> Single Instance: #103 |
| 101<br>Start Autosetup                               | By the provider by running .../api/Apps/start-autoSetup                                             | Provider is triggering the portal autosetup endpoint with necessary offer details<br>the step will trigger the portal internal autosetup jobs (102, 103, 104, 105) | The process step is set to "DONE" <br>with successful endpoint request body (which is getting stored in a temp table)            | -                                          | -                                                   | Step stays on "TO_DO" till the endpoint got successfully triggered (content is correct) | Apps: #102 <br>Services: #104                   |
| 102<br>OfferSubscription Client Creation             | Automatically by the portal application                                                             | Created app client in Keycloak and DB, additionally app instance is getting created                                                                                | The process step is set to "DONE" <br>after all records are created                                                              | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by Keycloak                  | Yes, in case of an 4xx by Keycloak                                                      | #104 <br>#105                                   |
| 103<br>Single Instance Subscription Details Creation | By the provider by running ?????                                                                    | Single Instance Subscription Details Creation                                                                                                                      | The process step is set to "DONE" <br>as soon as the url and instance is linked                                                  |                                            | -                                                   | -                                                                                       | #105                                            |
| 104<br>Offer Subscription Technical User Creation    | Automatically by the portal application                                                             | Technical User creation in Keycloak and metadata storage in portal db, additionally notification creation with technical client id                                 | The process step is set to "DONE" <br>after technical user ot successfully created                                               | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by Keycloak                  | Yes, in case of an 4xx by Keycloak                                                      | #105                                            |
| 105<br>Activate Subscription                         | By the provider by running .../api/Apps/subscription/{offerSubscriptionId}/activate-single-instance | Subscription record activation, notification creation and send email.                                                                                              | The process step is set to "DONE" <br>after xxx                                                                                  | xxx                                        | Yes, in case of an 5xx for the email - auto "TO_DO" | -                                                                                       | Multi Instance: #106 <br> Single Instance: -    |
| 106<br>Trigger Provider Callback                     | Automatically by the portal application                                                             | Trigger provider callback url to share client and tech user.                                                                                                       | The process step is set to "DONE" <br>after xxx                                                                                  | xxx                                        | Yes, in case of an 5xx                              | Yes, in case of an 4xx                                                                  | -                                               |

<br>
<br>
For the app provider, following steps are needed to connect to this endpoint in the respective needed manner:
Due to the process worker/asynchronous setup of the process, the provider needs to connect to two additional endpoints to be able to fetch the status as well as the needed information for the application setup
 - GET /api/Apps/{appId}/subscription/{subscriptionId}/provider
 Used to watch the autosetup status via the property "processStepTypeId" as well as the technicalUserID which is needed to call the technical user credentials (next endpoint)
 - GET /api/administration/serviceaccount/owncompany/serviceaccounts/{serviceAccountId}
 Used to fetch the specific app tenant created technical user credentials by adding the "serviceAccountId" (aka technicalUserId) fetched via the endpoint of GET /api/Apps/{appId}/subscription/{subscriptionId}/provider
 - PUT /subscription/{subscriptionId}/activate
 Needed to run at the end of the customer tenant/instance configuration the activation of the subscription which will also initiate the customer information and sharing the tenantUrl

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
