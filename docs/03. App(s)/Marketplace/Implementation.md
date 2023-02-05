# Summary

...description to be added...
<br>
<br>

Links:  

[Design](/docs/App(s)/Marketplace/Design.md)  
[FAQ](/docs/App(s)/Marketplace/FAQ.md)

<br>
<br>


# Implementation

### #1 Store User Favorites
The App favourite function is offered in the app marketplace to highlight an app easily and ensure that I as an user can quickly find the app again.
User favorites are stored inside the DB - the portal db will know which user has which favorite selected and can easily retrieve the information for the Front-End
<br>

```diff
! GET: /api/apps/favourites
```

<br>
<br>

### #2 App Overview

API is used to display the active apps of the CX network based on the released apps. If an app is under review or creation, the app wont show up in this view.
<br>

```diff
! GET: /api/apps/active
```

<br>
<br>

### #3 App Details

The api is responding with all app details for a specific app id. Within the path, the app id is getting send. Additionally language can get set as optional parameter. If no value is send for "language" inside the request call, english will be used as default language setting for the app detail response.   
Additionally the app subscription status is included.  
<br>

The app details endpoint include
- app title
- app leadimage id
- app detail image id's
- provider URI
- provider name
- provider contact email
- provider contact number
- app supported use cases
- app long description
- app price tag
- app tags
- subscription status (for the respective company of the api calling user)
- app supported languages
- app documents (documents of type APP_CONTRACT, APP_DATA_DETAILS, ADDITIONAL_DETAILS, APP_TECHNICAL_INFORMATION)

<br>

```diff
! GET /api/apps/{appId}
```

Subscription Status Management:
The "Subscribe" button shows different state and color depending on the company subscription status. Below the button states are shown:

<img width="465" alt="image" src="https://user-images.githubusercontent.com/94133633/211010886-3c1be3e3-7796-4ea3-bc48-fc11fe42c4b0.png">

<br>
<br>


### #4 My Business Application

#### DB Details

Relevant DB tables

* company_user_assigned_roles
* user_roles
* app_assigned_clients
* company_assigned_offers


#### Get my Business Applications
The API Backend call is retrieving all apps, where the current user is having an active role assigned.
The service call is getting triggered for an individual user as soon as this user logs in to the application.

Important for the function is an active company subscription of the assigned users company.
<br>

```diff
! GET: /api/apps/business
```

<br>
<br>
