# Implementation
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

```diff
- to be added
```
<br>
<br>


<br>
<br>
Flow diagram for option a) and b)
<img width="1050" alt="image" src="https://user-images.githubusercontent.com/94133633/210187844-366e7cff-6e69-417b-9aa5-073d2409815a.png">
Details about the BPDM data call can get found in the Interface / API Call specification: BPDM - Get/Post Company Data
<br>
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


