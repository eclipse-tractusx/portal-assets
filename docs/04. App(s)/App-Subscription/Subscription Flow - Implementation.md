## Implementation 

### DB implementation

To support the app subscription status, the portal db model was enhanced by a new table "Subscription_status" and the status attribute which got added inside the company_assigned_apps table

<img width="612" alt="image" src="https://user-images.githubusercontent.com/94133633/211090678-e3d559fb-d6a5-466c-917b-840329a3d3de.png">

<br>
<br>

### #1 POST Subscribe Request

The post subscribe request is triggered by the customer / interested company via the app marketplace "Subscribe" function.
The request triggers a request to the app provider (via portal notifications and email).
Via the subscribe request service, the app provider gets informed about the raised customer interest and can take the following actions to activate the app usage.
<br>

Business Logic:
With the POST api, the backend service will
* create a record inside the company_assigned_apps table
* status_id for the record will get set to "PENDING"

<br>

```diff
! POST /api/apps/{appId}/subscribe
```

<br>
<br>

### #2 Subscription Activation

To activate a customer subscription request, the /autosetup endpoint is provided to autosetup the app client, create relevant technical users and activate the app for the customer.  
<br>
The activation will allow the customer company to assign the app user roles to existing user accounts. With the assigned roles, the respective users will find the app inside the "My Business App" feature on the home page.  
=> details to "My Business Apps" can be found here https://github.com/catenax-ng/tx-portal-assets/blob/b482f54b1601c61f957c898b045d43b6fa486818/docs/Marketplace(s)/HowTo-App-Marketplace.md
<br>

Business Logic:
* create app instance / client in central idp to enable tenant authentication/authorization
* create app_subscription_details record with customer app tenant url
* store app instance / client details inside the portal db
* update the status of the 'company x appId' record insight the table offer_subscriptions to "ACTIVE"

<br>

```diff
! POST /api/apps/autoSetup
```

<br>
<br>

### #3 Manage (own) App Subscription
Get Subscription Customer Endpoint is used to receive all the subscriptions which the company has subscribed for.

Subscriptions with status PENDING, ACTIVE and INACTIVE will get distracted.

<br>

```diff
! GET /api/apps/subscribed/subscription-status
```

<br>
<br>

### #4 Manage App Subscriptions
Get Subscription Provider Endpoint is used to receive all subscriptions or subscription requests of my offered apps.

Subscriptions with status PENDING, ACTIVE and INACTIVE will get distracted.

<br>

```diff
! GET /api/apps/provided/subscription-status
```

<br>
<br>

### #4 Put Inactivate App Subscriptions

text needed

<br>

```diff
! PUT /api/apps/{appId}/unsubscribe
```

<br>
<br>
