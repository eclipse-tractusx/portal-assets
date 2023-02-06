# Summary

The Page "App Approval Board" is accessible via the top main menu for CX Admins.

The main focus / scope of the page is to enable the operator to manage apps releases for the CX marketplace.

The page includes following functions

* search
* filter
* approve a app release
* decline a app release (with message)
* look up app details

<br>
<br>

# Functions

Page Design  
<br>
<img width="577" alt="image" src="https://user-images.githubusercontent.com/94133633/213944231-3b631b2b-3885-4520-be47-f953b2914461.png">
<br>

With the initial page load, all apps waiting for a review are displayed.
The user can get to the app details or approve / decline the app release.

<br>
<br>

Function: Approve App Release

With the app releae approval, the app is getting activated for the app marketplace.
The approval is triggered by clicking on the approval icon insode the app card:
<br>

<img width="70" alt="image" src="https://user-images.githubusercontent.com/94133633/213944479-570790a8-e580-49e6-806a-f50df32b1d5b.png">

<br>
<br>


Function: Decline App Release

The app release decline icon can get triggered by clicking on the decline icon inside the app card. Additionally to the cancellation, a message can get added which will get provided to the app manager(s) of the respective company.
<br>

<img width="70" alt="image" src="https://user-images.githubusercontent.com/94133633/213944563-4e59d658-3475-4525-a522-8493a7bbd7ae.png">

<br>
<br>


# Implementation

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



