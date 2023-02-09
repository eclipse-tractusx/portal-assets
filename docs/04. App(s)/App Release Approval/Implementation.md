#x Implementation

### #1 App Release Overview
Display all apps under review as well as those which are approved.
Endpoint is supporting pagination.
<br>

```diff
! GET: /api/apps/appreleaseprocess/inReview
```

Details to the data mapping:

<img width="809" alt="image" src="https://user-images.githubusercontent.com/94133633/213944314-2efd4f81-cd7b-4dd9-9e29-877078a2161c.png">

<br>

#### Sorting
<br>
<img width="318" alt="image" src="https://user-images.githubusercontent.com/94133633/213944346-28d2a92d-9341-4761-a815-39a99d07b514.png">
<br>

Sorting by "Newest First": {hostname}/api/apps/AppReleaseProcess/inReview?page=0&size=15&sorting=DateDesc  
Sorting by "App Title A-Z": {hostname}/api/apps/AppReleaseProcess/inReview?page=0&size=15&sorting=NameAsc

<br>

#### Views
<br>
<img width="300" alt="image" src="https://user-images.githubusercontent.com/94133633/213944368-33a036e9-5fc0-4389-af34-9c4b56f089b3.png">
<br>

All: {hostname}/api/apps/AppReleaseProcess/inReview?page=0&size=15&sorting=DateDesc  
Request Only:  {hostname}/api/apps/AppReleaseProcess/inReview?page=0&size=15&sorting=DateDesc&statusID=INREVIEW

<br>
<br>

### #2 Approve App Release
The approve app release function is used to release an app which is in status "In Review" to the marketplace.

With the approval the status of the app is getting updated to "ACTIVE" and the app provider (app manager) is getting informed about the successful release.
<br>

```diff
! PUT /api/apps/appreleaseprocess/{appId}/approveApp
```

<br>
Details regarding the notification can get found in the notification service documentation: Notification Service



### #3 Decline App Release
The decline app release function is used to reject apps and sending the them back to the status "CREATED" .

With the rejection the app manager will receive an notification as well as an email regarding the rejection and rejection details via a message field.

<br>

```diff
! PUT /api/apps/{appId}/declineApp
```

<br>

Details regarding the notification can get found in the notification service documentation: Notification Service
