# CX-Membership

## Interface / API / Service Summary
The membership discovery endpoint is used to display/retrieve all cx network members based on the bpn

<br>
<br>

## Architecture Overview

n/a

<br>
<br>

## Implementation

### #1 CX Membership Discovery
The cx membership discovery endpoint can get triggered via technical as well as real users, if relevant roles are available.  
For technical user, a company can request the user creation via the link to technical user creation.  
For details, click following link:   
[Technical User Management](/docs/03.%20User%20Management/03.%20Technical%20User/02.%20Create%20Technical%20User.md#create-a-new-technical-user)  
<br>

```diff
! GET api/administration/partnernetwork/memberCompanies
```

###### Request Body

n/a

###### Response Body

the string response includes all bpn's of active network members

          [
            "string"
          ]

<br>
the string response includes all bpn's of active network members

<br>
<br>
