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

### #1 POST Service URL
The post service url is enabling the service / app provider to store/hold the service partner / app partner autosetup url.
<br>
Logic: the service provider/app provider (must be an cx member) can trigger the endpoint to store the autosetup endpoint.
<br>

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211172164-f552814c-4212-4936-9c52-a8f7df3622df.png">

<br>

```diff
! POST api/administration/serviceprovider/owncompany
```

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



