# Dataspace Discovery

## Interface / API / Service Summary
The EDC / dataspace discovery interface is a CX network public available endpoint which can get used to retrieve edc endpoints and the related BPNs, as well as search for endpoints via the BPN

<br>
<br>

## Architecture Overview

n/a

<br>
<br>

## Implementation

### #1 EDC Discovery
The edc discovery endpoint can get triggered via technical as well as real users, if relevant roles are available.  
For technical user, a company can request the user creation with the technical user creation feature inside the portal.  
For details, click following link: 
[An Internal Link](/User%20Management/Technical_User/HowTo.md)
https://github.com/catenax-ng/tx-portal-assets/blob/add73daa995047ce0717ac12fb73b5306f32f570/docs/User%20Management/Technical_User/HowTo.md
<br>

<img width="600" alt="image" src="https://user-images.githubusercontent.com/94133633/211172164-f552814c-4212-4936-9c52-a8f7df3622df.png">

<br>

```diff
! POST api/administration/serviceprovider/owncompany
```

<br>
<br>
