# Technical User - How to (Functional explanation)

## Create a new user
User with the respective user management rights can access the user management via the top right user navigation.
As soon as the user management is displayed, a button "Technical User Management" shows up to switch from real users to technical users.  
<br>

<img width="893" alt="image" src="https://user-images.githubusercontent.com/94133633/210973017-231ef4f5-6865-437b-a102-3164740585fc.png">


With a click on "Create Technical User" an overlay will get displayed where the user has to add following information.  
<br>
* Username (username to be added for own verification)
* Description (description of the technical user, will be useful in case several technical users are existing)
* Service / Permission (which user rights/roles are needed

<br>
<br>

As soon as the user is selecting the "Confirm" button, the user is getting created as service account / technical user.  
Each technical user will have the relevant permission assigned and a user attribute "bpn" is getting added based on the requesting users bpn.

<br>

With the shared user_id and secret, the technical user can get used to authenticate for the respective service.

<br>
<br>

Please note - in the current implementation the endpoint for the respective CX modules such as digital twin and semantic hub are not visible in the technical user creation.  
endpoints of the cx core components can get found under following links (please make sure your refer to the right env.) API Documentation. 
and the endpoint to get a technical user token inside the int env is following:
* dev: https://centralidp.dev.demo.catena-x.net/auth/realms/CX-Central/protocol/openid-connect/token
* int: https://centralidp.int.demo.catena-x.net/auth/realms/CX-Central/protocol/openid-connect/token

<br>
<br>

## Delete an user
Technical users created under the same company id can get deleted by user administrators.
To delete an user, just open up the user details and click the "delete" button.

<img width="558" alt="image" src="https://user-images.githubusercontent.com/94133633/210966679-5997f888-c7af-4ff4-b2e9-474c1e0f9009.png">

<br>
<br>
<br>
<br>

#### Currently not supported:

update technical user secret
