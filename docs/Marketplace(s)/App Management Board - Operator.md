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
... to be added....

<br>
<br>

Function: xxxx





<br>
<br>


Function: xxxx

<br>
<br>


# Implementation

### #1 App Release Overview
......



```diff
! ...
```

Details to the data mapping:

 ----- add data mapping details ------



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
! PUT /api/apps/appreleaseprocess/{appId}/declineApp
```

<br>

Details regarding the notification can get found in the notification service documentation: Notification Service



