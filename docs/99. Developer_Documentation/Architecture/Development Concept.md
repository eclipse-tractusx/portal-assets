# Development Concept

## Build, test, deploy
Details to the build, test and deploy process can get found under following link/md file:  
https://github.com/catenax-ng/tx-portal-assets/blob/945546d91065b8870aa8f69ce94b48eac7a5ade2/docs/Release-Process.md
<br>
<br>

## Development Guidelines
The portal is using following key frameworks:
<br>
* Javascript / React
* .Net
* i18n
* Keycloak
<br>
<br>

#### Swagger
The API uses OpenAPI annotations to describe the endpoints with all necessary information. The annotations are then used to automatically generate the OpenAPI specification file, which can be viewed in the Swagger UI that is deployed with the application.
<br>
<br>

## Migration
To run the portal, migrations are needed to load the initial data inside the identity provider and the portal db to enable the portal to work.
The migration will consist of an initial migration as well as delta migration files with future releases. As part of a new release, a migration file (if applicable) will get released and can get loaded via a delta load.
<br>
<br>

## Configurability
Portal configuration is mainly possible via the appsetting files as well as the static data migration files.
