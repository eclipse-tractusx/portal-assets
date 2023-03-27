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
For details, click following link: [Technical User Management](/docs/03.%20User%20Management/03.%20Technical%20User/02.%20Create%20Technical%20User.md#create-a-new-technical-user)  
<br>

```diff
! POST: /api/administration/connectors/discovery
```

###### Request Body
The request body is expecting a list of BPNs for which the EDC endpoint should get be fetched. Please add minimum one BPN.  
<br>

        [
          "string"
        ]

###### Response Body

        [
          {
            "bpn": "string",
            "connectorEndpoint": [
              "string"
            ]
          }
        ]


<br>
In case of an empty response, no edc is found for the requested BPNs

<br>
<br>
