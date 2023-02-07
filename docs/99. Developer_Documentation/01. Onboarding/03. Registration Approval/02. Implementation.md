# Implementation
<br>

## 1 Get Applications
<br>
Get all applications in status "submitted", "confirmed" or "declined" with the respective application data entered by the registration company member.   
<br>

Response Body / Details:

			{
			  "meta": {
			    "totalElements": 0,
			    "totalPages": 0,
			    "page": 0,
			    "contentSize": 0
			  },
			  "content": [
			    {
			      "applicationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			      "applicationStatus": "CREATED",
			      "dateCreated": "2023-01-22T19:29:38.897Z",
			      "companyName": "string",
			      "documents": [
			        {
			          "documentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			          "documentType": "CX_FRAME_CONTRACT"
			        }
			      ],
			      "companyRoles": [
			        "ACTIVE_PARTICIPANT"
			      ],
			      "applicationChecklist": [
			        {
			          "typeId": "REGISTRATION_VERIFICATION",
			          "statusId": "TO_DO"
			        }
			      ],
			      "email": "string",
			      "bpn": "string"
			    }
			  ]
			}

Pagination, Filtering as well as search is enabled to support the user to easily find application requests.  
<br>
<br>

###### Filtering
Review: {hostname}/api/administration/registration/applications?page=0&size=20&companyApplicationStatusFilter=InReview  
Closed: {hostname}/api/administration/registration/applications?page=0&size=20&companyApplicationStatusFilter=Close  
All: {hostname}/api/administration/registration/applications?page=0&size=20  
<br>

###### Search
Search is enabled by company name.  
<br>

#### Logical flow of the service
* Get all applications which are submitted for review or where review is finished
* Applications in any status beside the three mentioned status above will not get included in the response.  
<br>

#### API Details

```diff
! GET api/administration/registration/applications?page=0&size=4
```

Endpoints supports pagination and search via companyName
<br>
<br>

## 2 Get Application Details
<br>
Additionally to the endpoint of #1 where application key data are included, the GET application details endpoint is used to provide additional details to the operator / application approval buddy.  
This mainly covers:
- address details
- unique identifier
- agreement/consent status per company role
- users running under the application
<br>

Response Body / Details:

			{
			  "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			  "name": "string",
			  "shortName": "string",
			  "bpn": "string",
			  "city": "string",
			  "streetName": "string",
			  "countryAlpha2Code": "string",
			  "region": "string",
			  "streetAdditional": "string",
			  "streetNumber": "string",
			  "zipCode": "string",
			  "countryDe": "string",
			  "companyRoles": [
			    {
			      "companyRole": "ACTIVE_PARTICIPANT",
			      "agreements": [
			        {
			          "agreementId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			          "consentStatus": "ACTIVE"
			        }
			      ]
			    }
			  ],
			  "companyUser": [
			    {
			      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			      "firstName": "string",
			      "lastName": "string",
			      "email": "string"
			    }
			  ],
			  "uniqueIdentifier": [
                            {
                              "type": "VAT_ID",
                              "value": "string"
                            }
                          ]
			}

<br>
<br>


#### API Details

```diff
! GET api/administration/registration/application/{applicationId}/companyDetailsWithAddress
```

<br>
<br>

## 3 Confirm/Approve Application
<br>
The API is approving the application request.
Inside the api implementation, the application status is validated to ensure that only applications with the correct status are updated. If the application is in any other status then "submitted", the call will run on an error.
The following picture gives an overview of the executed backend jobs when confirming a application request.
<br>
<br>

<img width="800" alt="image" src="https://user-images.githubusercontent.com/94133633/210287995-c44c968a-e58f-4af8-9b78-515a3649d6fe.png">


#### Logical flow of the service
* Create Identity Wallet for the to be approved company (syncron call to the wallet)
* Create legal person self-description (syncron call to SD Factory)
* Assign necessary/required user roles for portal access to the user (role: company admin)
* Unassign registration permission
* Set application, invitation and company inside the portal DB to "approved" / "active"
* Send email with notification/information to the company users
<br>
<br>

#### API Details

```diff
! PUT api/administration/registration/application/{applicationId}/approveRequest
```

<br>
<br>

## 4 Decline Application
<br>
The API is declining a selected application request.
Inside the api logic, the application status is validated to ensure that only applications with the correct status are updated. If the application is in any other status then "submitted", the call will run on an error.
The following picture gives an overview of the executed backend jobs when declining an application request.
<br>
<br>

<img width="800" alt="image" src="https://user-images.githubusercontent.com/94133633/210287995-c44c968a-e58f-4af8-9b78-515a3649d6fe.png">


#### Logical flow of the service
* Set application and company inside the portal DB to "approved" / "active"
* Send email with notification/information to the company users
<br>
<br>

#### API Details

```diff
! PUT api/administration/registration/application/{applicationId}/declineRequest
```

<br>
<br>

## 5 Download Documents
<br>
The API is downloading the document which is selected by the user.<br>
<br>
<br>

<img width="624" alt="image" src="https://user-images.githubusercontent.com/94133633/210288200-6aa73570-11d2-4742-8d92-0d870ccd44be.png">

#### Logical flow of the service
* By clicking on the document name, the document is fetched from the db and auto downloaded
<br>
<br>

#### API Details

```diff
! GET /api/administration/Documents/{documentId}
```

<br>
<br>


## 6 Add bpn to a company registration
<br>
With the api 'add company bpn' the CX Admin is able to add a bpn to a company registration under the status "submitted".
Standard validations apply:
* bpn has to be 16 digits long
* bpn must start with "bpnl" / "BPNL"
* company status inside portal db needs to be in "pending"
* input value for the bpn is expected alphanumeric<br>
<br>
<br>

<img width="624" alt="image" src="https://user-images.githubusercontent.com/94133633/210288308-f217bc4e-211c-4223-b63d-07a7bef146f4.png">

#### Logical flow of the service
* if no bpn is added to the company registration so far, the admin can manually add a bpn
<br>
<br>

#### API Details

```diff
! POST: /api/administration/registration/application/{applicationId}/{bpn}/bpn
```

<br>
<br>
