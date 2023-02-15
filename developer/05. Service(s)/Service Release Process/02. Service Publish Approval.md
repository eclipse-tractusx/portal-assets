## Summary

The service publish process is currently under creation and will be UI supported in release 3.1 or 3.2

Till that, the service publication is only available via api endpoints. Users can trigger those endpoints to generate a new service. The service approval (which is needed to get the service published on the marketplace, needs to get triggered by the portal administrator)

<br>
<br>

Links:  

[Design](/docs/Service(s)/Release-Process/Design.md)  
[FAQ](/docs/Service(s)/Subscription/FAQ.md)

<br>
<br>

## Implementation

### #1 Approve Service Request

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

### #2 Decline Service Request
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
<br>

    {
      "message": "string"
    }

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
