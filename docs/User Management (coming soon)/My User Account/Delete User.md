# Delete User 

Inside the portal, a user will be able to delete an user - the function is differentiated into 2 functions

* Delete your own user account
* Delete an user account of a user inside your organization (only available for the IT Administrator)
<br>
<br>

## Own User Deletion Flow
<br>
<br>
<img width="1496" alt="image" src="https://user-images.githubusercontent.com/94133633/210905135-0cae225d-ef83-4136-93c9-a9a8af960699.png">
<br>
<br>

## Company User Deletion Flow
<br>
<br>
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/94133633/210905154-247f0c87-99eb-4706-9ef5-764d27f3ca1e.png">
<br>
<br>

## Functionality and impacted Keycloak layers
<br>
<br>
<img width="1101" alt="image" src="https://user-images.githubusercontent.com/94133633/210905264-7b13264b-bfb6-4883-941f-4ef3d006745c.png">
<br>
<br>


## API Details

### #1 Delete my user
<br>
Delete own user account.
<br>
Important - due to the audit relevance, we dont delete directly all user related connections.
<br>
Instead user will get set to "DELETED", and following information/details will get deleted
<br>
<br>

* User credential/account
* User favorites
* User assigned roles
* User invitation record
* User assigned bpn's

<br>

```diff
! DELETE api/administration/user/ownUser/{companyUserId}
```

<br>
With the deletion an automatic logic will get processed. After latest 5 seconds, the user token will get disabled and the user will be logged out.

<br>
<br>

### #2 Delete user {userId}
<br>
Delete an user of the same company inside the portal DB and keycloak.
<br>
Important - due to the audit relevance, we dont delete directly all user related connections.
<br>
Instead user will get set to "DELETED", and following information/details will get deleted
<br>
<br>

* User credential/account
* User favorites
* User assigned roles
* User invitation record
* User assigned bpn's

<br>

```diff
! DELETE api/administration/user/owncompany/users
```

<br>
<br>

