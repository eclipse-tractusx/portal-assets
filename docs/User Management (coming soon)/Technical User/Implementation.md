# Implementation - API Details

### #1 Get Service Accounts

The endpoint provides the possibility to look up all service accounts of my company (how: service accounts are connected to companies. Retrieve the current accounts with the company_id via the user_id inside the user token)  
<br>
Permission: "view_tech_user_management"

```diff
! GET: api/administration/serviceaccount/owncompany/serviceaccounts
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
