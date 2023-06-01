# Offer Autosetup

## Interface / API / Service Summary
For the case of a service setup / app, where an autosetup is available, CX will offer a standardized interface to push the relevant information to the service provider, which can trigger the service setup, if relevant.  
<br>
Following interfaces are relevant to enable the autosetup  

1. POST Service URL (Generic endpoint for service providers to store their autosetup - if available - url inside CX)
2. POST Service Request (Specific endpoint to trigger customer subscription)
3. POST Instance Details (Register service instance for customer inside CX)

<br>
<br>

## Architecture Overview

### #1 Highlevel Architecture picture

<img width="756" alt="image" src="https://user-images.githubusercontent.com/94133633/211172076-72c4894e-17a6-49a6-bf68-5c5a889781e0.png">

<br>
<br>

### #2 Details

<br>
<br>

## Implementation

### #1 PUT Service URL
The PUT service url is enabling the service / app provider to store/hold the service partner / app partner autosetup url.
<br>
Logic: the service provider/app provider (must be an cx member) can trigger the endpoint to store the autosetup endpoint.
<br>

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211172164-f552814c-4212-4936-9c52-a8f7df3622df.png">

<br>

```diff
! PUT api/administration/serviceprovider/owncompany
```

With the first time calling the endpoint; the url will be set as app/service provider endpoint as a new data set.  
With any further endpoint triggers; the existing record will get overwritten. Means; the app/service provider can have only one endpoint configured.

<br>
<br>

### #2 POST Service Request
he service request (from the customer, to the provider) is getting stored and managed under this api.
<br>

```diff
! POST /api/services/{serviceId}/subscribe
```

<br>
This API will be used to trigger (if available) the service provider endpoint (stored under #1) with the following body
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

### #3 POST Service Instance
Post service request is used to create the customer service/app instance inside the portal db.  
With the successful client/app instance creation on the portal side, the technical user for the AAS registry will get send within the response
<br>

Request Body
<br>

          [
           {
             requestId (service request id),
             appUrl (service provider endpoint / client / app)
           }
          ]

<br>

```diff
! POST: /api/services/autosetup
```

API Endpoint Logic

* Validate if requestId is existing in app_subscription table
* Validate if user calling the endpoint is registered as service provider of the service/app
* Validate if the subscription is in status "PENDING"
  * if yes, proceed
  * if no, error
* Run client name creation (logic needed - similar like the service account logic implemented by Norbert; but in this case for the client itself) - ideally naming convention should be something like Cl-{AppName}-{CustomerName}
* Add app instance and client for the customer and app id in following tables
  * iam_client table
  * app_instance table
* Next, create the client in keycloak central IdP - setting
  * Client ID: {client name defined by the service before}
  * Access Type: {public, might get auto set, please check}
  * Standard Flow Enabled: true
  * Direct Access Grants Enabled: true
  * Valid Redirect URIs: {url send via the request body, likely a "*" needs to get added}
  * Web Origins: "+"
  * Backchannel Logout Session Required: true
  * Full Scope allowed: false


* now add roles to the same client by using the roles stored inside user_roles in the portal db and linked to the respective app for which the instance got created
* Create the technical user for the service, by creating another client with following settings
  * Client ID: {ideally client name + prefix "sa-"}
  * Access Type: {confidential}
  * Standard Flow Enabled: false
  * Direct Access Grants Enabled: false
  * Service Accounts Enabled: true
  * Backchannel Logout Session Required: true

  * Full Scope allowed: true
  * Service Account Roles: select the service account role "Digital Twin Management" of the client "technical_roles_management"

* add to the technical user the bpn as attribute (bpn of the customer) and the bpn mapper inside the client. Config see attachment
* store technical user data inside portal db => description "Technical User for app {app name} - {techUserRoleName}"
* Technical user to be mapped to the customer company id
* Back inside the portal db, update the service/app status in the app_subscription table from "PENDING" to "ACTIVE"
* Create Notifications
  * customer notification to inform the customer company about the technical user creation via the service provider. (receiver: customer IT admin)
  * customer notification to inform the customer company about the activated app/service (receiver: customer app requester, customer IT admin)

<br>

Response Body
<br>

          {
             technicalUserId,
             technical user secret
           }


<br>
<br>

## Checklist Worker

| Process Step | Description | Success Scenario | Error (process_step status FAILED) | Auto Retrigger? | Manual Retrigger? | Possible Following Steps |
|---|---|---|---|---|---|---|
| 100<br>Trigger Provider | Subscription Record creation in "PENDING" <br>Portal triggers the Offer Provider URL (if provider url is stored) | If the provider endpoint is responding with 20x <br>the process step will get set to "DONE" and "SKIPPED" if no URL is available | ?? | Yes, in case of an 5xx | Yes, in case of an 400 (wrong content) 404 (wrong url) | Multi Instance: #101 <br> Single Instance: #103 |
| 101<br>Start Autosetup | Provider is triggering the portal autosetup endpoint with necessary offer details<br>the step will trigger the portal internal autosetup jobs (102, 103, 104, 105) | The process step is set to "DONE" <br>with successful endpoint request body (which is getting stored in a temp table) | - | - | Step stays on "TO_DO" till the endpoint got successfully triggered (content is correct) | Apps: #102 <br>Services: #104 |
| 102<br>OfferSubscription Client Creation | Created app client in Keycloak and DB, additionally app instance is getting created | The process step is set to "DONE" <br>after all records are created | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by keycloak | Yes, in case of an 4xx by keycloak | #104 <br>#105 |
| 103<br>Single Instance Subscription Details Creation | Single Instance Subscription Details Creation | The process step is set to "DONE" <br>as soon as the url and instance is linked | | - | - | #105 |
| 104<br>Offr Subscription Technical User Creation | Technical User creation in keycloak and metadata storage in portal db, additionally notification creation with technical client id | The process step is set to "DONE" <br>after technical user ot successfully created | Status "FAILED" if job was running on fail | Yes, in case of an 5xx by keycloak | Yes, in case of an 4xx by keycloak | #105 |
| 105<br>Activate Subscription | Subscription record activation, notification creation and send email. | The process step is set to "DONE" <br>after xxx | xxx | Yes, in case of an 5xx for the email - auto "TO_DO" | - | Multi Instance: #106 <br> Single Instance: - |
| 106<br>Trigger Provider Callback | Trigger provider callback url to share client and utech user. | The process step is set to "DONE" <br>after xxx | xxx | Yes, in case of an 5xx | Yes, in case of an 4xx | - |


