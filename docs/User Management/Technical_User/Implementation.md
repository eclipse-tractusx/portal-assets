# Implementation - API Details

### #1 Get Service Accounts

The endpoint provides the possibility to look up all service accounts of my company (how: service accounts are connected to companies. Retrieve the current accounts with the company_id via the user_id inside the user token)  
<br>
Permission: "view_tech_user_management"

```diff
! GET: api/administration/serviceaccount/owncompany/serviceaccounts
```

      {
        "meta": {
          "totalElements": 0,
          "totalPages": 0,
          "page": 0,
          "contentSize": 0
        },
        "content": [
          {
            "serviceAccountId": "uuid",
            "clientId": "string",
            "name": "string",
            "serviceAccountType": "MANAGED/OWN",
            "offerSubscriptionId": "uuid"
          }
        ]
      }

<br>
<br>

#### Get Service Account Role Profiles

Technical users are currently managed under one single client. "Tech_User_Management" client.
All technical user roles are created inside this client as "composite role". With that, permissions of the actual client where the technical client will need to get access to, can get assigned to the roles inside the client "Tech_User_Management".

On the FE side, for role assignment, only the composite roles will be visible for the user

Data flow details are drawn below

<img width="637" alt="image" src="https://user-images.githubusercontent.com/94133633/210976320-210ae964-8be8-4bc6-bb42-bddd235025ba.png">

```diff
! GET: /api/administration/serviceaccount/user/roles
```

<br>
<br>

### #2 Create Service Account

Create new service account under the same company as the executing user  
Permission: "add_tech_user_management"
<br>
<br>
With the POST api, the backend service will
<br>
* creates the user inside keycloak central idp
* updates the data inside portal iam_service_accounts
* updates the data inside portal company_service_accounts
   * service_account type is automatically set to "own"
   * subscription_id NULL
* updates the data inside portal company_service_accounts_assigned_roles
* As part of the user creation, the user gets set to "ACTIVE" inside the portal db.

```diff
! POST: api/administration/serviceaccount/owncompany/serviceaccounts
```

<br>
<br>

### #3 Show Tech. Service Account Details (of just created Account)

The endpoint provides the possibility to look up technical user details
Permission: "view_tech_user_management"
<br>
<br>
Technical Service Account Detail information
<br>
* id
* company
* clientId
* clientCredential
* role

```diff
! GET: api/administration/serviceaccount/owncompany/serviceaccounts/{serviceAccountId}
```

<br>
<br>

### #4 Delete Service Account

Delete an existing service account  
Only service accounts of the own company can get deleted.
Permission: "delete_tech_user_management"
<br>
<br>
As part of the deletion API, the following tasks get executed:

* Delete service account inside the central identity provider
* Technical user record is set to "INACTIVE"


```diff
! DELETE: api/administration/owncompany/serviceaccounts/{serviceAccountId}
```

<br>
<br>

### #5 Service Accounts Created via service/app subscription

If the service account is created due to a servce/app activation; the service account user is created by the app/service provider; but connected to the actual customer (owner of the user).  
With that, the customer as well as the offer provider should be able to view the service account with certain privileges.

With the POST api, the backend service will
<br>
* creates the user inside keycloak central idp
* updates the data inside portal iam_service_accounts
* updates the data inside portal company_service_accounts
   * service_account type is automatically set to "managed"
   * subscription_id is filled by the customer app/service subscriptionID
* updates the data inside portal company_service_accounts_assigned_roles
* As part of the user creation, the user gets set to "ACTIVE" inside the portal db.

```diff
Part of the following endpoint:
POST: /api/apps/autoSetup as well as POST: /api/service/autoSetup
```

More details available inside the autosetup service description.


<br>
<br>
