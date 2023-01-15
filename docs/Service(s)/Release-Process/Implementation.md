# Summary

The service publish process is currently under creation and will be UI supported in release 3.1 or 3.2

Till that, the service publication is only available via api endpoints. Users can trigger those endpoints to generate a new service. The service approval (which is needed to get the service published on the marketplace, needs to get triggered by the portal administrator)

<br>
<br>

Links:  

[Design](/docs/Service(s)/Release-Process/Design.md)  
[FAQ](/docs/Service(s)/Subscription/FAQ.md)

<br>
<br>

# Design

![Tag](https://img.shields.io/static/v1?label=&message=ImplementationOngoing&color=yellow&style=flat)

<br>
<br>

# Implementation

### #1 POST Service Office Request

Service provider can create a new service offer. The endpoint validates
<br>

```diff
! POST: /api/services/addservice
```

<br>

Request body:
<br>
<img width="350" alt="image" src="https://user-images.githubusercontent.com/94133633/211117569-30b3192d-fe4f-4ef1-ac0d-254d838bb73a.png">

<br>
<br>

### #2 Update a service offering

Service Providers are able to update their own service offering by calling the put endpoint.
<br>

```diff
! PUT: /api/services/{serviceId}
```

<br>

Request body:
<br>
<img width="350" alt="image" src="https://user-images.githubusercontent.com/94133633/211117745-0c346160-3e83-49f3-ba55-e2c0ed429bc0.png">

<br>
<br>

### #3 Submit the service for release/publishing

The endpoint is used to submit a service for release/publish validation by the operator of the marketplace.  
Services created by a company can get pushed to the "In Review" state of the service is owned by the company and all respective needed data inputs are filled.
<br>

```diff
! PUT /api/services/{serviceId}/submit
```

<br>
Please note, a notification will get created and is documented in the notification service documentation: Notification Service

<br>
<br>

### #4 Approve Service Request

A service publish request can get approved by an CX Admin.  
The approval will trigger the service publish on the marketplace, the service manager will get informed about the successful publishing of the service.
<br>

```diff
! PUT /api/service/{serviceId}/approveService
```

<br>
Please note, a notification will get created and is documented in the notification service documentation: Notification Service

<br>
<br>

### #5 Decline Service Request
A service publish request can get declined by an CX Admin.  
The respective service which was declined is getting set back to the status "CREATED" and a message will get stored and submitted which holds the details regarding the decline reason.
<br>

```diff
! PUT /api/service/{serviceId}/declineService
```

<br>
Please note, a notification will get created and is documented in the notification service documentation: Notification Service

<br>

Request body:

<img width="350" alt="image" src="https://user-images.githubusercontent.com/94133633/211117939-f1e6620c-9dfc-4434-9db9-29ca9c577d18.png">

<br>
<br>

Details of the api logic/business logic

* update status from "IN REVIEW" to "CREATED"
* create a notification for the service provider about the decline details
* Service Manager of the company will receive the notification (means, with the rejection of the service release, a notification for all the company related users with the role "Service Manager" of the offer "Portal" will get created)
* Notification type: "SERVICE_RELEASE_REJECTION" (new notification type)
* Notification topic "OFFER"
* Notification content
  * "ServiceName":"{add here the ServiceName from offer.name}",
  * "OfferId":"{add here the ServiceName from offer.id}"
  * "Message":"{decline reason}"
* On top of the notification, the rejection details should also get send via email

<br>
<br>
