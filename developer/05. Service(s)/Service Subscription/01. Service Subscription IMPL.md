# Summary

Service purchasing is describing the subscribe/purchase process of an service inside the catena-x service marketplace.

<br>
<br>

Links:  

[Design](/docs/Service(s)/Subscription/Service-Subscription.md)  
[FAQ](/docs/Service(s)/Subscription/FAQ.md)

<br>
<br>


# Implementation

### #1 Get Service Agreements

When the user is requesting to subscribe a service, the service agreements show up which the user needs to "confirm".  
Via api, the agreements will get fetched from the backend to display them to the user.
<br>

Data mapping:

<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/211170605-0cddbc42-f8dc-401d-9ded-fc34aa10fdf1.png">


<br>

```diff
! GET /api/services/serviceAgreementData
```

<br>
<br>

### #2 Post Subscription Request

The post subscribe request is triggered by the customer / interested company via the app marketplace "Subscribe" function. The request triggers a request to the app provider (via portal notifications and email). Via the subscribe request service, the app provider gets informed about the raised customer interest and can take the following actions to activate the app usage.

Business Logic: With the POST api, the backend service will

* create consent agreements inside the consensts table
* create a record inside the company_assigned_apps table
* status_id for the record will get set to "PENDING"
* if a autosetup url is configured; the service provider if will get triggered. Details to the service can get found here: <strong> Service Autosetup Interface</strong>
<br>

```diff
! POST /api/services/{serviceId}/subscribe
```

<br>
<br>

### #3 Activate Subscription & Tenant

For all tenant based services / apps, an endpoint is created where app/service provider can active the customer subscription by creating the relevant auth client and enables the customer to assign app roles to their users and login via SSO into the service.  
Additionally the interface will send a technical user with credentials to the respective service provider. With those credentials, the service provider can enable the AAS registration, DAPS  and create the Self Description.
<br>

```diff
! POST /api/services/autoSetup
```

<br>
<br>
