# Implementation
<br>

### #1 Get App Roles and Descriptions
Retrieving all app roles and the respective description from the portal backend to display them on the portal screen
<br>
<br>

### #2 Get Company App Users & Serach
Retrieving all company users which have a roles assigned/not assigned for the pre-selected app.

The response will include users under the same company and != status "DELETED"

API supports

* Pagination
* Has role of the app assigned: true/false (optional parameter)

```diff
! GET /api/administration/user/owncompany/apps/{appId}/users?page=0&size=15
```

App Access Management user list as well as the app assign role user list is using the endpoint to display the respective user.

Example:
<br>
<img width="480" alt="image" src="https://user-images.githubusercontent.com/94133633/210906432-25b600af-9024-44ff-b309-567cfe38bd25.png">
<br>
<br>

In case the api is responding with an empty array, the UI will display following messages:

<img width="700" alt="image" src="https://user-images.githubusercontent.com/94133633/210906517-badf352e-7acc-4735-b738-098706d97f13.png">
<br>
<br>

### #3 Add App Role
Add an app role to a company user.

Validation:

* actie app subscription must be existing
* client must be existing
* company user needs to belong to the same company


```diff
! PUT api/administration/user/{companyUserId}/app/{appId}/roles
```

<br>
<br>

### #4 Update App Role
Update user roles works with an easy method. FE provides all role assignments via the endpoint request body.  
The backend will use this input and freshly reset the user assigned user roles. With this mechanism, the endpoint can get used for assignment as well as unassignment of roles in the same manner.

Validation:

* actie app subscription must be existing
* client must be existing
* company user needs to belong to the same company


```diff
! PUT api/administration/user/{companyUserId}/app/{appId}/roles
```

<br>
<br>
