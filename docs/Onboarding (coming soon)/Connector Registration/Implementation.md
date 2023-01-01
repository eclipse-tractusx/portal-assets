# Implementation
<br>

## 1 Get all MY Connector Registrations
<br>
The user can retrieve all connectors which are connected to his/her company as consumer
<br>
<br>

#### Logical flow of the service
* fetch the user id from the user token calling the GET call
* from the user token user_id get via the table iam_user the company_user_id
* use the company_user_id to retrieve the company_id
* now get all connectors where company_id is added as consumer
<br>
<br>

#### API Details

```diff
! GET /api/administration/connectors
```

Endpoints supports pagination
<br>
<br>

## 2 Create new Connector Registration - self-owned

The user can create a new connector registration by using the connector POST call.
The registration will automatically trigger the daps certificate via the public key which was uploaded by the user. In case the DAPS is failing, the connector will still get registered and DAPS registration will be hold on "PENDING" and needs to get re-triggered by the user.
<br>
<br>
>Connector Name
>- length: min 2; max 20
>- A-z
>- spaces
>- numbers
>- @
>
>Validate the connector URL 
>- data input should start with "https:" 
>- and input validation: ^(?:https:\/\/)([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])[.]([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])[.]([a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9])*$
>
>Connector Owner 
>- BPNL's are allowed only. User need to add the BPNL. Validation needed that the input is exact 16 digits and starts with "BPNL"
>
>Authentication
>- only allowes .pem and .cert files
<br>
<br>

#### Logical flow of the service

* fetch the user id from the user token calling the POST call
* from the user token user_id get via the table iam_user the company_user_id
* fetch via the company_user_id the company id which is used has host and provider of the edc
* input data as well as the backend fetched company id's are send to the SD factory to create the connector self-description with connection to the wallet
* after successful self-description creation, the edc details as well as the self-description document are getting stored inside the portal database
* last the daps is getting triggered to register the connector inside the daps authentication service; in case the service fails; the user will get informed and needs to retrigger the daps
<br>
<br>

#### API Details

```diff
! POST /api/administration/Connectors/daps/
```

<br>
<br>

## 3 Create new Connector Registration - managed 

Service Provider can create a new registration for a company which subscribed for a service provider service
<br>
<br>
>Connector Name
>- length: min 2; max 20
>- A-z
>- spaces
>- numbers
>- @
>
>Validate the connector URL 
>- data input should start with "https:" 
>- and input validation: ^(?:https:\/\/)([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])[.]([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])[.]([a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9])*$
>
>Connector Owner 
>- BPNL's are allowed only. User need to add the BPNL. Validation needed that the input is exact 16 digits and starts with "BPNL"
>
>Authentication
>- only allowes .pem and .cert files
<br>
<br>

#### Logical flow of the service

* fetch the user id from the user token calling the POST call
* from the user token user_id get via the table iam_user the company_user_id
* use the company_user_id to retrieve the company_id
* validate if a service request is active between service provider company and to be registered connector company
* if record found, proceed
* if not, block and send back an error
<br>
<br>

#### API Details

```diff
! POST /api/administration/connectors/managed
```

<br>
<br>

## 4 Retrigger DAPS

In case the DAPS registration failed as part of the connector registration, the user will be able to retrigger the endpoint directly.
For this endpoint; following data will be pushed
<br>
<br>
>Validation:
>
>* connectorId existing
>* validate is daps registration flag is false (if not, dont run the daps registration)
>* if the endpoint gets an error => send the error back to the front-end and keep the connector daps registration flag on "false"
>* if the endpoint result is "success" => set the connector daps registration flag to "true" and send success message to the FE
<br>
<br>

#### API Details

```diff
! POST /api/administration/connectors/trigger-daps/{connectorId}
```

<br>
<br>

## 5 Delete Connector

Delete own connector. The deletion will disable the discovery service for the connector.
<br>
<br>

#### API Details


```diff
! DELETE /api/administration/connectors/{connectorID}
```

<br>
<br>

## DB Model

  <img width="863" alt="image" src="https://user-images.githubusercontent.com/94133633/210186672-24c3217f-dc98-4382-814f-11d7221f17b3.png">


