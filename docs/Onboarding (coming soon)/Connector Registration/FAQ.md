# FAQ

## How to register a connector inside the network?
A connector can get created via the user navigation "Connector Registration".
<br>
The sub-menu is only available for company administrators.
<br>
<br>
The connector registration will auto generate the connector self-description and the daps authentication.
<br>
<br>
<img width="350" alt="image" src="https://user-images.githubusercontent.com/94133633/210186408-65dde63a-d9cc-46b9-be6c-4f3976fdde1e.png">
<br>
<br>
In the following window, select the connector type. Either "Company Connector" (own Connector) or "Connector-as-a-service" (managed Connector).
<br>
<br>
<img width="280" alt="image" src="https://user-images.githubusercontent.com/94133633/210186440-9f185013-436f-49bb-9aeb-0bb6c3d78326.png">
<br>
<br>
After selecting the connector and pressing "confirm" the connector form gets displayed where connector details as well as the authentication key (public key) needs to get added.
The public key is needed for the connector authentication inside the dataspace. Details to the connector authentication can get found HERE (to be added asap).
<br>
<br>
With the successful registration, the connector is part of the dataspace. This means, the connector can get identified by other dataspace participants, as well as authentication is secured.
<br>
<br>

## Whats the difference of a OWNED and a MANAGED connector?
Owned connectors are company (own managed) connectors.
Managed connectors are (3rd party managed) connectors, e.g. if a connector is managed by a service provider.
<br>
<br>

## How can a connector get deleted?
The deletion of a connector is similar as the registration only possible if the user has enough user permissions. Ideally the company administrator or IT admin.
To delete a connector registered inside the network, get to the connector overview and trigger the deletion via the delete icon.
<br><img width="54" alt="image" src="https://user-images.githubusercontent.com/94133633/210186617-d6d83c01-04eb-4ca6-8901-f848cd6975ea.png">
<br>
With the successful deletion, the daps registration will get disabled and the connector wont be available in the dataspace anymore.
<br>
<br>

## What is a "PENDING" connector?
A pending connector status shows, that the connector is not fully registered inside the dataspace yet. For example: the daps authentication might be missing or the connector provider still needs to configure the connector before the connector is fully usable.
In case of a managed connector - please contact for any questions your service provider.
<br>
<br>

## Why is my connector authentication icon green or grey?
The connector authentication icon shows the authentication status. If the icon is grey, the authentication was unsuccessful; in this case a new authentication needs to get manually triggered. Otherwise the connector will be not useable inside the dataspace.
A green connector icon shows the active authentication registration.
<br>
<br>
