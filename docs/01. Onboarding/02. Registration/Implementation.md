# Implementation
<br>


## Registration Login

With the login of the user to the registration, first the application record with status is getting loaded via the portal db.
Based on the fetched status; the frontend logic will decide how the user proceeds.  
<br>

1. If the status is any status before "SUBMITTED" (< id "7"); the company registration form gets displayed; starting with the introduction screen.  
If company registration data have been previously added/saved already, the data will be displayed inside the registration form; otherwise an empty registration form woll be displayed. 
3. If the status is in status "SUBMITTED" (= id "7"); the information screen "application in validation" screen is getting displayed.  
   <img width="443" alt="image" src="https://user-images.githubusercontent.com/94133633/216842731-5a2097ac-240c-44fe-aa0b-8396d0474690.png">

5. If the status is in status "APPROVED" (= id "8"); the user should get redirected to the portal "home" page  

7. If the status is in status "DECLINED" (= id "9"); the information screen "application declined and closed" screen is getting displayed  


<br>
<br>

## Enter / Verify Company Data
<br>
<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/210187915-d4adf4a4-ac0f-4512-b4f6-f53d7e3bc7d8.png">
<br>
In step 1, the user is asked to add the company details

* a) via BPN search and automatic data load

* b) adding the data manually
  * Legal Entity Name
  * Registration Name
  * Legal Entity Street
  * House Number
  * Postal Code
  * City
  * Country
  * NEW Unique ID such as Handelsregister, Tax ID, etc.
<br>
<br>

#### API Details

##### Display Company Data Registration Details

```diff
! GET /api/registration/application/{applicationId}/companyDetailsWithAddress
! GET /api/registration/legalEntityAddress/{bpn}
```

<br>

.....

<br>
<br>
Flow diagram for option a) and b)
<img width="1050" alt="image" src="https://user-images.githubusercontent.com/94133633/210187844-366e7cff-6e69-417b-9aa5-073d2409815a.png">
Details about the BPDM data call can get found in the Interface / API Call specification: BPDM - Get/Post Company Data
<br>
<br>


##### Unique Identifier

The company unique identifier is a company specific identifier which is used to help companies to prove their identity. In Catena-X registration party needs to add minimum one unqiue identifier which is later used inside the application verification flow to identifier the companies identity.
To support the user entry and ensure that human errors are reduced, an endpoint to fetch the allowed unique identifier (per country) as well as field input validations are implemented.


##### Logic implemented for the country specific identifier

The unique identifier is a location based attribute; means, after the user entered a country code; the FE needs to fetch the possible company identifier via an api call an display them inside the new FE dropdown field (see details below)

initially when opening the registration form step 1 "company data"; the unique identifier section is not displayed. 
Only when entering the country code; the unique id section is getting displayed (see screen below)

<img width="401" alt="image" src="https://user-images.githubusercontent.com/94133633/216842872-4891a050-00f3-4ba4-a97e-b223f22a5170.png">

```dif
! GET /api/registration/company/country/{alpha2Code}/uniqueidentifiers
```

###### API Response

		[
		  {
		    "id": 1,
		    "label": "COMMERCIAL_REG_NUMBER"
		  },
		  {
		    "id": 2,
		    "label": "VAT_ID"
		  }
		] 

###### Result on UI

<img width="855" alt="image" src="https://user-images.githubusercontent.com/94133633/216842966-d590263b-8793-43cb-bba5-8f9fcdd06b2e.png">

Translation of technical api response keys to human readable titles:

   <img width="357" alt="image" src="https://user-images.githubusercontent.com/94133633/216842986-eea5153f-318d-466b-b9f1-8775f64ee7cc.png">

###### Implemented Pattern

<img width="1012" alt="image" src="https://user-images.githubusercontent.com/94133633/216843013-8601c1eb-372a-4f39-87ec-f849fbfb4d20.png">


<br>
<br>


###### POST allowed Unique Identifier

no post call existing. The data will get stored as part of the POST /companyDetailsWithAddress endpoint

<br>
<br>


##### Store / Save Company Data Registration Details
<br>
Via the post request, all company details will get stored/saved inside the portal db. The endpoint is used for both methods (manual data entering as well as the bpdm interface usage).  
<br>

```diff
! POST /api/registration/application/{applicationId}/companyDetailsWithAddress
```

<br>

>Validation
>
>Search
>- input must have exact 16 characters
>- input must start with "BPNL"
>- A-Z
>- 0-9
>
>BPN - out of scope, user cant edit the field
>
>Legal Entity Name - minlength: 3, maxlength: 50; pattern:
>- A – Z; a-z
>- numbers (0 – 9)
>- or any of the following special characters: ! # ' $ @ & % ( ) * + , - _ . / : ; =  < > ? [ ] \ ^
>- name must start with a letter or a number
>- space
>
>Registered Name - minlength: 3, maxlength: 60; pattern:
>- A – Z; a-z
>- numbers (0 – 9)
>- or any of the following special characters: ! # ' $ @ & % ( ) * + , - _ . / : ; =  < > ? [ ] \ ^
>- name must start with a letter or a number
>- space
>
>Street with House Number - minlength: 3, maxlength: 60; pattern:
>- A – Z; a-z
>- numbers (0 – 9)
>- or any of the following special characters: -
>- name must start with a letter or a number
>- space
>
>Postal Code - minlength: 0, maxlength: 10; pattern:
>- A – Z; a-z
>- numbers (0 – 9)
>
>City - minlength: 3, maxlength: 20; pattern:
>- A-Z
>- a-z
>
>Country - minlength: 3, maxlength: 20; pattern:
>- A-Z
>- a-z
<br>
<br>

## Add Aditional Users
<br>
<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/210187937-82a3eb9f-4953-4f3c-8841-cfb16c89f248.png">
<br>
As part of the registration and onboarding process a number of users will be needed to support

* Signing Manager
* Legal Admin
<br>
<br>

#### API Details

```diff
- to be added
```
<br>
<br>

## Select company role & sign terms and conditions
<br>
<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/210187987-d0dee3e8-c180-44f7-a2d2-ae78a1b020b9.png">
<br>
For the company role selection the Company Admin can select the company role within the network
<br>
* Active Participant
* App Provider
* ...
<br>
Additionally to the roles, the role related agreements are displayed.
<br>
<br>
If an agreement as an assigned document, the document can get downloaded by the user by clicking on the document name. A help text is statically pushed to provide the context to the document.
<br>
<br>
In the scenario of no document linked to the agreement, the agreement name will get displayed inside the user interface for approval.
<br>
<br>

#### API Details

#1 Roles and agreements are fetched from the consent endpoint
```diff
! Get /api/registration/company/companyRoles
```


#2 Consent Post
Via the endpoint post consent, the consent given by the user to the respective agreements is getting stored against the company application

```diff
! Post /api/registration/application/{applicationId}/companyRoleAgreementConsents
```
<br>
<br>

## Upload registration relevant documents
<br>
<img width="400" alt="image" src="https://user-images.githubusercontent.com/94133633/210188158-22d3f21a-bb4e-4c39-b619-a000cb446c87.png">
<br>
In Step 4, the users are asked to upload the company identification.
<br>
All documents uploaded under the same application register form are shown. If a second user has already uploaded a doc, the user will be able to see as well as delete this document as weel; as long as the users belong to the same company application.
<br>
<br>

#### API Details

##### #1 API Get Documents
Fetching documents already loaded by a company assigned user which is connected to the current application.  
<br>

```diff
! GET /api/registration/application/{applicationId}/documentType/{documentTypeId}/documents
```
<br>
<br>

##### #2 API Upload Document
Documents are uploaded into the portal.document table and are connected via the user_id and document_type to the respective application.  
<br>

```diff
! POST /api/registration/application/{applicationId}/documentType/{documentTypeId}/documents
```
<br>
<br>


##### #3 API Delete Document
Documents can get deleted as long as the documents are still in the right/respective status.  
<br>

```diff
! DELETE /api/registration/documents/{documentId}
```

<br>
<br>
Important: only documents under the same application are deletable. Additional the application needs to be in any status beside submitted; approved and declined.
<br>
The document deletion does also validate the document type. Only types related to the registration can get deleted.
<br>
<br>

##### #4 API Download Document
Uploaded documents can also get viewed / downloaded by the user. To do this, the user needs to open the document by clicking on the document name. Automatically the document will get downloaded.  
<br>

```diff
! GET /api/registration/Documents/{documentId}
```
<br>
<br>

>Validation
>* only pdf documents are allowed to get uploaded (api and fe secured)
>* maximum size of document upload: 8MB (api secured)
>* authentication and authorization are FE and BE implemented
>* backend validation: only users which are linked to the correct company and application can run the respective endpoints

<br>
<br>

## Verify your data
...
<br>
...

##### #1 Get application data
...
<br>

```diff
! GET POST /api/registration/application/{applicationID}/registrationData
```
<br>
<br>

##### #2 Submit Registration
<br>
text text text
<br>
The endpoint triggers the
* submission of the applicaton (status update to "SUBMITTED")
* all documents related to the application get "locked"
<br>

```diff
! POST /api/registration/application/{applicationID}/submitregistration
```
<br>
<br>
