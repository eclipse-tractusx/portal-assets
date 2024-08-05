## Autosetup User Flow Description

The autosetup feature streamlines the process of setting up customer instances for service/app subscriptions by leveraging a company's internal ramp-up service. Below is an expanded user flow description that includes the asynchronous nature of the monitoring step.

> note: it is not mandatorily needed to use the automation flow, the offer provider is getting fully frontend enabled (via portal subscription management) as well.

### Architecture Overview

#### #1 Highlevel Architecture picture

<img width="756" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-service-subscription-flow.png">

<br>
<br>

### Step 1: Configuring the Ramp-Up Service Endpoint

Offer providers are required to configure their internal ramp-up service endpoint, which will be used to initialize customer service/app instances upon subscription.

- Access the portal with UI or as a technical user with "Offer Management" permissions.
- Define the endpoint for the autosetup feature.

**Endpoint Configuration:**

- **Path**: `.../api/administration/serviceprovider/owncompany`
- **Method**: `PUT`
- **Description**: This endpoint allows storing the autosetup URL. It's available to providers with the "service provider" company role and will overwrite any existing configuration with updates.
FYI: Company Role change process is defined under the following link [Change Company Role](/docs/user/02.%20Technical%20Integration/05.%20Company%20Role/Change%20Company%20Role.md)  
- **Auth**: Users with App Manager, Service Manager, or "Offer Management" technical users can trigger this endpoint.

**UI Flow:**

<img width="600" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/register-url-popup.png">

<br>

- Enter the ramp-up service URL in the UI as shown in the example pop-up.
- Submit the URL to be used for future customer subscription events.

<br>
<br>

**Endpoint Configuration Result:**

The endpoint receives customer subscription information in the following structure when a new service/app subscription is made:

```json
[
  {
    "customer": {
      "organizationName": "companyName",
      "country": "company country alpha2code",
      "email": "user email address which triggered the service"
    },
    "properties": {
      "bpnNumber": "bpn of the company",
      "subscriptionId": "",
      "serviceId": ""
    }
  }
]
```

### Step 2: The Autosetup Flow

With the customer's subscription, the portal initiates the autosetup flow:

1. **Portal Trigger**: The portal calls the configured autosetup URL with the subscription details.
2. **Receiving Subscription Data**: The offer provider receives the subscription data according to the structure provided in Step 1.
3. **Validation**: The provider validates the received request.
4. **Ramp-Up & Configuration**: The service/app is ramped up and configured, potentially involving the creation of a technical user.
5. **Activation**: Finally, the customer's subscription request is activated.

**Endpoints for Ramp-Up and Activation:**

- **Deprecated**: `POST /api/Apps/autoSetup`
- **Current**: `POST /api/Apps/start-autoSetup`

#### Details of POST /api/Apps/start-autoSetup

As an functional extension and more app/service provider centric approach, the endpoint /api/Apps/start-autoSetup got developed which is providing:

- process worker used to setup offer provider relevant objects and user notifications
- in case of system errors or process issues, data loss is prevented by using temp data storage and automatic retriggering of processes

<br>

**Path**: `.../api/Apps/start-autoSetup`
**Method**: `POST`  
**Description**: Triggers the setup of the appID, technical user based on the previously configured technical user profile as well as provides the offer provider access to the customer externalService URLs
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

> note you will need the technical user, external service URLs and appID - all those will get created via a process worker and will be asnychronly available via the endpoints defined below under step#3

### Step 3: Monitoring and Finalizing Setup (Asynchronous Endpoint)

Monitoring the setup process is done through an asynchronous endpoint, which may require multiple calls by the provider to fetch all necessary data:

1. **Monitor Status**: `GET /api/Apps/{appId}/subscription/{subscriptionId}/provider` allows providers to monitor the autosetup status. Since this is an asynchronous endpoint, providers may need to poll this endpoint multiple times to obtain the technicalUserID, technical user secret, appId, and externalService ID (for external service connections like wallets).
2. **Fetch Credentials**: Once the technicalUserID is available, providers can call `GET /api/administration/serviceaccount/owncompany/serviceaccounts/{serviceAccountId}` to get technical user credentials.
3. **Activate Subscription**: The final step involves calling `PUT /subscription/{subscriptionId}/activate` to complete the setup and ensure customers are notified.

## Checklist Worker details (running in the background of step 2)

**Process Worker Process Steps Overview**

| ID  | Process Step                                        | Initiated by | Description | Successor Step |
|-----|-----------------------------------------------------|--------------|-------------|----------------|
| 100 | Trigger Provider                                    | Automatically by the portal application | Subscription Record creation in "PENDING" Portal triggers the Offer Provider URL (if provider URL is stored) | Multi Instance: 101 Single Instance: 103 |
| 101 | Start Autosetup                                     | By the provider by running .../api/Apps/start-autoSetup | Provider is triggering the portal autosetup endpoint with necessary offer details the step will trigger the portal internal autosetup jobs (102, 103, 104, 105) | Apps: 102 Services: 104 |
| 102 | OfferSubscription Client Creation                   | Automatically by the portal application | Created app client in Keycloak and DB, additionally app instance is getting created | 104, 105 |
| 103 | Single Instance Subscription Details Creation       | By the provider by running ????? | Single Instance Subscription Details Creation | 105 |
| 104 | Offer Subscription Technical User Creation          | Automatically by the portal application | Technical User creation in Keycloak and metadata storage in portal db, additionally notification creation with technical client id | 105 |
| 105 | Activate Subscription                               | By the provider by running .../api/Apps/subscription/{offerSubscriptionId}/activate-single-instance for multi instance offers and /api/apps/subscription/{offerSubscriptionId}/activate-single-instance for single instance offers | Subscription record activation, notification creation and send email. | Multi Instance: 106 Single Instance: - |
| 106 | Trigger Provider Callback                           | Automatically by the portal application | Trigger provider callback URL to share client and tech user. | - |

**Success/Failure Sceanrios**

| ID  | Process Step                                        | Success Scenario | Error (process_step status FAILED) |
|-----|-----------------------------------------------------|------------------|------------------------------------|
| 100 | Trigger Provider                                    | If the provider endpoint is responding with 20x the process step will get set to "DONE" and "SKIPPED" if no URL is available | ?? |
| 101 | Start Autosetup                                     | The process step is set to "DONE" with successful endpoint request body (which is getting stored in a temp table) | - |
| 102 | OfferSubscription Client Creation                   | The process step is set to "DONE" after all records are created | Status "FAILED" if job was running on fail |
| 103 | Single Instance Subscription Details Creation       | The process step is set to "DONE" as soon as the URL and instance is linked | |
| 104 | Offer Subscription Technical User Creation          | The process step is set to "DONE" after technical user successfully created | Status "FAILED" if job was running on fail |
| 105 | Activate Subscription                               | The process step is set to "DONE" after successful activation | xxx |
| 106 | Trigger Provider Callback                           | The process step is set to "DONE" after successful callback | xxx |

**Retrigger Options**

| ID  | Process Step                                        | Auto Retrigger? | Manual Retrigger? |
|-----|-----------------------------------------------------|-----------------|-------------------|
| 100 | Trigger Provider                                    | Yes, in case of a 5xx | Yes, in case of a 400 (wrong content) or 404 (wrong url) |
| 101 | Start Autosetup                                     | - | Step stays on "TO_DO" till the endpoint got successfully triggered (content is correct) |
| 102 | OfferSubscription Client Creation                   | Yes, in case of a 5xx by Keycloak | Yes, in case of a 4xx by Keycloak |
| 104 | Offer Subscription Technical User Creation          | Yes, in case of a 5xx by Keycloak | Yes, in case of a 4xx by Keycloak |
| 105 | Activate Subscription                               | Yes, in case of a 5xx for the email - auto "TO_DO" | - |
| 106 | Trigger Provider Callback                           | Yes, in case of a 5xx | Yes, in case of a 4xx |


<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
