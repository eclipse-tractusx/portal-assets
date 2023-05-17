## Summary

Notification Services are used to send messages to one or several users. Usually notification services are known as push services, where a system/application is pushing notifications to a mobile device of the user.  
In CX, the idea of push notification to a mobile device is something which is currently not in scope of the implementation, however the initial service of notifications inside the portal is planned as an mvp for Release 2/3.

<br>
<br>

## Architecture

<img width="1368" alt="image" src="https://user-images.githubusercontent.com/94133633/211213676-a10a97d7-a2e4-4f72-b07d-9ecdaf9be8c5.png">

<br>
<br>

## Design

##### Elements

<img width="300" alt="image" src="https://user-images.githubusercontent.com/94133633/211213774-1078849f-2dee-4ce2-a652-331024ddd63d.png">

++ highlight messages which have read status "false"
++ enable urls inside the message
++ user navigation count is red, if messages with needed actions are unread

<br>

##### WebApplication User Interface

###### User Navigation

Scenario 1
If unread messages are "0" the notification icon wont show up. Instead only the user icon will be displayed

<img width="70" alt="image" src="https://user-images.githubusercontent.com/94133633/211213885-30afb622-9fdb-4cb2-b94b-c50d2c9fd272.png">

<br>

Scenario 2
If unread messages are > 0 AND the actionRequired are = 0; the user icon with notification "false" state will get displayed. Inside the notification count bubble the number of "unread" messages will be shown.

<img width="64" alt="image" src="https://user-images.githubusercontent.com/94133633/211213867-6338e90f-61dd-48fb-9395-8292e2d8a92f.png">

<br>

Scenario 3
If unread messages are > 0 AND the actionRequired are > 0; the user icon with notification "true" state will get displayed. Inside the notification count bubble the number of "actionRequired" messages will be shown.

<img width="70" alt="image" src="https://user-images.githubusercontent.com/94133633/211213901-b65c97e3-0dce-42f3-9c1b-20d8bac3afb3.png">

<br>

###### Notification Screen

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211213958-df1a063c-e217-41ed-8407-1754dc299c1b.png">

<br>

###### Filtering

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211213984-2656cc47-8709-4823-9b1e-83b77f17a848.png">

<br>

###### Deletion Process for "Action Required" Notifications

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211214010-c1f21cbe-1350-47f3-89b9-4669d9a0fc67.png">

<br>

<br>
<br>

## Implementation Details

### Database

<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/211214049-4970683d-22ab-4757-8ef2-85e1b2db6634.png">

<br>

Important: the notification message is not available/stored inside the database; instead the db is only storing message metadata and the actual message text is handled inside the FE translation file located in the following repo structure. 
Front-End repo cx-portal/src/assets/locales/en/notification.json

<br>
<br>

### #1 Get User Notification Count

The get user notification count job is used to fetch the count of unread notifications, as soon as the user logs in to the CX Network.  
Via the user token, all relevant information will get fetched from the portal db and getting displayed in the user account.
<br>

```diff
! GET /api/notification/count
```

<br>
<br>

### #2 Get User Notification Count-Details

With the user notification details, read and unread count per filter can get fetched.  
<br>
The endpoint is a pure calculation/counting of the different metadata found below:

* read
* unread
* infoUnread
* offerUnread
* actionRequired
* unreadActionRequired
<br>

```diff
! GET /api/notification/count-details
```

<br>

Response Body

          {
            "read": 18,
            "unread": 30,
            "infoUnread": 11,
            "offerUnread": 1,
            "actionRequired": 25,
            "unreadActionRequired": 18
          }

<br>
<br>

### #3 Get User Notification Details

The get user notification details is following the "get user notification count" job.  
The details job will only run when the user is clicking on the notification sub-menu.  
The endpoint supports pagination inside the metadata section.
<br>

Additionally the endpoint supports to

* only get read messages
* only get unread messages
* get only a specific notification type
* get only due notifications
* sorting by date and read status
<br>

```diff
! GET /api/notification
```

<br>

Response Body  
Please note, the "content" text is only an example, each service has its own content attributes defined. Details to the actual content can get found here: /notificationDetails

          {
            "meta": {
              "totalElements": ##,
              "totalPages": ##,
              "page": ##,
              "contentSize": ##
            },
            "content": [
              {
                "id": "uuid",
                "created": "date",
                "typeId": "label",
                "notificationTopic": "label",
                "isRead": false or true,
                "content": "{\"OfferId\":\"uuid\",\"CompanyName\":\"string\",\"OfferName\":\"string\"}",
                "dueDate": null or date
              }
            ]
          }

<br>
<br>

### #4 PUT User Notification "read" / "unread"

The user can select a notification inside the notification screen and put that notification to "read" or "unread".  
This will impact the notification count of #1. Since #1 will only show those notification as "new" or "to be checked" notifications which are not set to "read"
<br>

```diff
! PUT /api/notification/read or /api/notification/read?notificationStatusId=UNREAD
! PUT /api/notification/read or /api/notification/read?notificationStatusId=READ
```

<br>
<br>

### #5 DELETE User notification 

With the delete user notification, a notification can get deleted. The function is triggered by the user himself and will be executed without any chance for notification recovery.
<br>

```diff
! DELETE /api/notification/{notificationId:guid}
```

<br>
<br>

### #6 Implemented Sorting feature

User can sort results based on given sorting possibilities. The sorting will act jointly with the view component.  
Means, if the user did selected the view "Info Only" and now wants to also sort the results; the sorting will get executed on the view "info only" and not on all notifications.  
Therefore following endpoints are implemented:
<br>

###### VIEW ALL (inside the filter)
Newest first: {hostname}/api/Notification?page=0&size=15&onlyDueDate=true&sorting=DateDesc  
Oldest first. {hostname}/api/Notification?page=0&size=15&sorting=DateAsc  
Unread first: {hostname}/api/Notification?page=0&size=15&sorting=ReadStatusAsc  

<br>

###### VIEW APP  (inside the filter)
Newest first: {hostname}/api/Notification?page=0&size=15&notificationTopic=OFFER&sorting=DateDesc  
Oldest first. {hostname}/api/Notification?page=0&size=15&notificationTopic=OFFER&sorting=DateAsc  
Unread first: {hostname}/api/Notification?page=0&size=15&notificationTopic=OFFER&sorting=ReadStatusAsc  

<br>

###### VIEW Info (inside the filter) 
Newest first: {hostname}/api/Notification?page=0&size=15&notificationTopic=INFO&sorting=DateDesc  
Oldest first. {hostname}/api/Notification?page=0&size=15&notificationTopic=INFO&sorting=DateAsc  
Unread first: {hostname}/api/Notification?page=0&size=15&notificationTopic=INFO&sorting=ReadStatusAsc  

<br>

###### View Action Required  (inside the filter)
Newest first: {hostname}/api/Notification?page=0&size=15 &notificationTopic=ACTION&sorting=DateDesc  
Oldest first. {hostname}/api/Notification?page=0&size=15& notificationTopic=ACTION&sorting=DateAsc  
Unread first: {hostname}/api/Notification?page=0&size=15& notificationTopic=ACTION&sorting=ReadStatusAsc  

<br>
<br>

### #7 Implemented Views

....
<br>

<img width="598" alt="image" src="https://user-images.githubusercontent.com/94133633/211214902-7cf17262-dfaa-4c49-9bd3-ffa48945ab44.png">

<br>

When the user is opening the page "All" is preselected and the notification as per the endpoint:  
https://portal-backend.dev.demo.catena-x.net/api/Notification?page=0&size=15&sorting=DateDesc  
<br>

When the user clicks on the view tag "app only" notification as per the endpoint are showing app:  
https://portal-backend.dev.demo.catena-x.net/api/Notification?page=0&size=15¬ificationTopic=OFFER&sorting=DateDesc  
<br>

When the user clicks on the view tag "info only" notification as per the endpoint are showing app:  
https://portal-backend.dev.demo.catena-x.net/api/Notification?page=0&size=15¬ificationTopic=INFO&sorting=DateDesc  
<br>

When the user clicks on the view tag "messaged with action required" notification as per the endpoint are showing app:  
https://portal-backend.dev.demo.catena-x.net/api/Notification?page=0&size=15&onlyDueDate=true&sorting=DateDesc  

<br>
<br>

## Configuration

### Notification Types / Messages
 
#### Welcome
Welcome Messages, triggered by the api endpoint
* PUT api/administration/registration/application/{applicationId}/approveRequest 

<br>

Topic | Notification Type | Content | UI Message | Receiver
-------- | -------- | -------- | -------- | --------
INFO | WELCOME | n/a	| Triggered from the FE locales file<br>Welcome to the Catena-X Network. To easily get you onboarded, a number of notifications / onboarding steps have been defined. Please check your notifications and start the configuration of your company area inside the portal to have a network experience based on your need. | New Registered Company Admin
INFO | WELCOME_USE_CASES | n/a	| Triggered from the FE locales file<br>The network is quite huge, we want to ensure that you can focus on your preferred use cases. Select your preferred use case from the table below. | New Registered Company Admin
INFO | WELCOME_SERVICE_PROVIDER | n/a	| Triggered from the FE locales file<br>If you need a service provider to help you with setting up your dataspace or an EDC, just follow us to the Service Provider Marketplace LINK | New Registered Company Admin
INFO | WELCOME_CONNECTOR_REGISTRATION | n/a	| Triggered from the FE locales file<br>You do not have any registered Connector so far – have a look at the connector offers and get your connector to participate. LINK | New Registered Company Admin
INFO | WELCOME_APP_MARKETPLACE | n/a	| Triggered from the FE locales file<br>Get a first inside into available apps, just follow us to the marketplace for apps. LINK | New Registered Company Admin

<br>
<br>

#### Offer Release Request
Offer Release Approval Messages, triggered by the api endpoint

* PUT /api/apps/appreleaseprocess/{appId}/submit
* PUT: /api/services/servicerelease/{serviceId}/submit

<br>

Topic | Notification Type | Content | UI Message | Receiver
-------- | -------- | -------- | -------- | --------
OFFER | APP_RELEASE_REQUEST | OfferId: {offer.id}<br>RequestorCompanyName:{companies.name}<br>OfferName: {offer.name} | Triggered from the FE locales file<br>{CompanyName} created a new app to get published to the catena-x marketplace. Please review the app release request and approve or decline the app release." here: LINK | CX Admin
OFFER | SERVICE_RELEASE_REQUEST | OfferId: {offer.id}<br>RequestorCompanyName:{companies.name}<br>OfferName: {offer.name} | Triggered from the FE locales file<br>{CompanyName} created a new service to get published to the catena-x marketplace. Please review the service release request and approve or decline the service release." here: LINK | CX Admin

<br>
<br>

#### Offer Subscription
Offer Subscription Messages, triggered by the api endpoint

* POST api/apps/{appID}/subscribe
* POST api/apps/{serviceID}/subscribe
* PUT api/apps/{appID}/subscription/company/{companyId}/activate
* ----autosetup----

<br>

Topic | Notification Type | Content | UI Message | Receiver
-------- | -------- | -------- | -------- | --------
OFFER | APP_SUBSCRIPTION_REQUEST | OfferId: {offer.id}<br>CompanyName: {companies.name}<br>OfferName: {offer.name} | Triggered from the FE locales file<br>A new app subscription request was triggered by {requestorCompanyName}. Get in contact with {userEmail} to agree on the app usage and setup guidelines. As soon as this is done, you can activate the app for {requestorCompanyName} here: LINK | App Provider - User documented as "Sales Manager"
OFFER | APP_SUBSCRIPTION_ACTIVATION | OfferId: {offer.id} | Triggered from the FE locales file<br>App {AppName} go activated, you can now assign user permission to this app. LINK | App Subscription Requester
OFFER | SERVICE_SUBSCRIPTION_REQUEST | OfferId: {offer.id}<br>RequestorCompanyName: {companies.name}<br>AppName: {offer.name}<br>UserEmail: {company_user.mail}<br>AutoSetupExecuted: {status}<br>AutoSetupError: {status} | Triggered from the FE locales file<br>A new app subscription request was triggered by {requestorCompanyName}. Get in contact with {userEmail} to agree on the app usage and setup guidelines. As soon as this is done, you can activate the service for {requestorCompanyName} here: LINK | Service Provider - User documented as "Sales Manager"
?? | TECHNICAL_USER_CREATION |  | Triggered from the FE locales file<br>??? | Service Subscription Requester
OFFER | SERVICE_SUBSCRIPTION_ACTIVATION | OfferId: {offer.id} | Triggered from the FE locales file | Service {ServiceName} go activated. Manage your subscriptions via the following service management panel: LINK | Service Subscription Requester

<br>
<br>

#### User Role Change
Role Change Messages, triggered by the api endpoint

* PUT: api/administration/user/owncompany/users/{companyUserId}/coreoffers/{offerId}/roles
* PUT: api/administration/user/owncompany/users/{companyUserId}/apps/{appId}/roles

Topic | Notification Type | Content | UI Message | Receiver
-------- | -------- | -------- | -------- | --------
INFO | ROLE_UPDATE_CORE_OFFER | CoreOfferName: "Portal"<br>Username: "{firstname} {lastname}"<br>RemovedRoles: "" (multiple roles possible)<br>AddedRoles: "" (multiple roles possible) | Triggered from the FE locales file<br>Dear {username},<br>your portal user roles got updated by your company administrator. With the change of the role assignment your access rights have changed. You can find more details regarding the role change impact by having a look at the portal role matrix and role description [Role Matrix]{ {hostname}/role-details}<br>New Roles: {add here the new AddedRoles}<br>Removed Roles: {add here the RemovedRoles} | User for which the role was added/deleted
INFO | ROLE_UPDATE_APP_OFFER | appName: "offer.name"<br>offerId: "offer.id"<br>Username: "{firstname} {lastname}"<br>RemovedRoles: "" (multiple roles possible)<br>AddedRoles: "" (multiple roles possible) | Triggered from the FE locales file<br>"Dear {username},<br>your app user roles got updated by your company administrator. With the change of the role assignment your access rights have changed. You can find all details regarding the role change below.<br>New Roles: {add here the new AddedRoles}<br>Removed Roles: {add here the RemovedRoles}" | User for which the role was added/deleted

<br>
<br>

## Notification "Done" State

![Tag](https://img.shields.io/static/v1?label=&message=UnderDevelopment&color=bluew&style=flat)

Notification "Done" state is available as automatic "Done" Flag in case a "Action Required" notification was successfully accomblished, while the notification is still visible in the respective user notification inbox.  
<br>
In the scenario of the following notification types, the notification table attribute "done" is tagged as "false" as soon as the notification is created. If one of the below defined endpoints is triggered for the respective notification object, the notification is getting set to "true" (for attribute "done")

<br>

Notification Type | Endpoint triggering the "DONE" Flag | Comment 
----------------- | ----------------------------------- | -------- 
8                 |	POST: /api/apps/autoSetup <br> 	      |  
11	        | PUT: /api/apps/appreleaseprocess/{appId}/approveApp <br> PUT: /api/apps/appreleaseprocess/{appId}/declineApp | 
13	        | POST: /api/services/autoSetup	 | 
17	        | PUT: /api/services/servicerelease/{serviceId}/approveService <br> PUT: /api/services/servicerelease/{serviceId}/declineService | 

<br>

For any other notifications, the attribute "done" inside the table portal.notifications will be "NULL"

<br>
<br>

Missing documentation:
* CONNECTOR_REGISTERED

<br>
<br>
