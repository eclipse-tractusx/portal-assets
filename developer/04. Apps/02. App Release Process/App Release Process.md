## Summary

The "App Release Publishing Process" is accessible via the "App Release Process" as well as the "App Management".  
<br>
The App Provider has access to both of the start screens to trigger a new app for marketplace publishing.  
<br>
The app publishing process includes the submission of relevant app details, adding app images, documents as well as testing and technical connection (where suitable).  


## Implementation

#### Trigger the Publishing Process

Option 1: Via the app management page

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211014835-71e80d17-06d3-42c9-ac67-739447336112.png">

<br>
<br>

Option 2: Via the App Release Process

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211015053-19b10f2d-9d8c-40f0-aa0f-30a25cd9b893.png">

<br>
<br>

#### Step 1 - App Card Details

<img width="373" alt="image" src="https://user-images.githubusercontent.com/94133633/211015263-2fc2adf5-df18-4559-9f6f-c2e90e7f8495.png">

In the Step 1 of the publishing process, the app card details are getting filled first

* app name
* provider
* app lead picture
* language support
* pricing information
* etc.


##### Implementation Details

* create a new app in table portal.apps with the data send in the request body
  * store the value "title" in the attribute name
  * store the value "provider" in the attribute provider
  * store the value "leadPictureUri" in the attribute thumbnail_url
  * the status of the app is getting set to "CREATED" => "1"
* portal.apps attribute provider_company_id is set based on the users company id
* the "descriptions" in de and en are stored in the table portal.app_descriptions (linked to the table portal.apps via the new created app id)
* the "supportedLanguageCodes" are stored in the table portal.app_languages (linked to the table portal.apps via the new created app id)
* the "useCaseIds" (supported app use_case(s)) are stored in the portal.app_assigned_use_cases table (linked to the table portal.apps via the new created app id)
* the "price" is stored in the portal.app_assigned_licenses table (linked to the table portal.apps via the new created app id)

<br>
<br>

##### API Details

###### #1 Get Languages
Get language api endpoint is used to provide the user a dropdown function in which the provider can select which language the respective app supports

```diff
! GET /api/administration/staticdata/languagetags
```

<br>

Response Body
   
     [
      {
       "languageShortName": "string",
       "languageLongNames": {
         "de": "string",
         "en": "string"
       }
      }
     ]
   


<br>
<br>

###### #2 Get Use Cases
Get use cases api endpoint is used to provide the user a dropdown function in which the provider can select which use cases the respective app serves

<img width="325" alt="image" src="https://user-images.githubusercontent.com/94133633/211015522-2b222613-61d9-4c9c-b1cf-343aff353628.png">

```diff
! GET /api/administration/staticdata/usecases
```

<br>

Response Body

    [
     {
       "useCaseId": "uuid",
       "name": "string",
       "shortname": "string"
     }
    ]


<br>
<br>

###### #3 Get Sales Manager
Get possible sales manager (under my company) which I can add as Sales Manager of my app. The Sales Manager is useful to assign specific notifications when an app get's a subscribe request.

```diff
! GET /api/apps/appreleaseprocess/ownCompany/salesManager
```

<br>

Response Body

    [
     {
       "userId": "uuid",
       "firstName": "string",
       "lastName": "string"
     }
    ]

<br>
<br>

###### #4 GET/POST App LeadImage

The endpoints enable the user to store and retrieve the app leadimage id.  
Using the document id of the response body, the document base64 encoding can get retireved and turned to the actual image.  
<br>

Supported formats: JPEG and PNG
<br>

```diff
! PUT /api/apps/appreleaseprocess/updateappdoc/{appId}/documentType/{documentTypeId}/documents
! GET /api/apps/appreleaseprocess/{appId}/appStatus
! GET /api/administration/documents/{documentId}
```

<br>
<br>

###### #5 DELETE Image
In case the user identifiers that a wrong image is loaded or the image doesnt fit/has changed; the DELETE endpoint is used to delete doucments linked to the app.
Important: the deletion is not reversable - since the app is still under DRAFT, all app related details will get deleted immediately.

```diff
! Delete: /api/apps/appreleaseprocess/documents/{documentId}
```

<br>

Validations:

* first, check if the user requesting the document deletion belongs to the same company as the user who has initially uploaded the document (acting user company relation needed + the user which is stored in the documents table for the respective document_if as company_user_id
* afterwards; check if the document is assigned to an app (via table offer_assigned_documents)
  * if yes proceed
  * if no, error "document not found"
* next check if the app is in status "CREATED" 
  * if yes proceed
  * if no, error "app is locked"
* check if the document_type is any of the following APP_IMAGE; APP_CONTRACT, ADDITIONAL_DETAILS, APP_LEADIMAGE, APP_TECHNICAL_INFORMATION
  * if yes, proceed
  * if no; error "incorrect document type - not supported for apps"
* validate if the document is unlocked
  * if yes; proceed
  * if no; error  "document is locked"
 

Deletion Flow (if all validations have been successful):
* delete the document (including the relation / link in table offer_assigned_documents)

<br>
<br>

###### #6 Create App
Created a new app for the current active app provider

```diff
! POST /api/apps/createapp
```

<br>

Request Body

     {
       "title": "string",
       "provider": "string",
       "salesManagerId": "uuid",
       "useCaseIds": [
         "uuid"
       ],
       "descriptions": [
         {
           "languageCode": "alpha2code",
           "longDescription": "string",
           "shortDescription": "string"
         }
       ],
       "supportedLanguageCodes": [
         "string"
       ],
       "price": "string",
       "privacyPolicies": [
         e.g. "COMPANY_DATA"
       ]
     }

<br>

Endpoint exception handling:

* SalesManager can be NULL
* validate if the SalesManager uuid is a valid uuid of an user with the role "SalesManager"
* validation is needed if the SalesManager belongs to the same company as the acting user 
* PrivacyPolicies must be one of the allowed values as per the static data table

<br>
<br>

>Input Validations
>
>* App Title - minlength: 5, maxlength: 40; pattern:
> * A-Z
> * a-z
> * .
> * :
> * _
> * -
> * @
> * &
> * 0-9
> * space
>
>* App Provider - minlength: 3, maxlength: 30; pattern: 
> * A-Z
> * a-z
> * space
>
>* Short Description (en) - minlength: 10, maxlength: 255; pattern:
> * a-zA-Z0-9 !?@&#'"()_-=/*.,;:
> 
>* Short Description (de) - minlength: 10, maxlength: 255; pattern
> * a-zA-ZÀ-ÿ0-9 !?@&#'"()_-=/*.,;:
> 
>* Use Case/Category - Dropdown element - pattern:
> * A-Z
> * a-z
> 
>* App Language - Multi Select List - pattern:
> * A-Z
> * a-z
> * space
> 
>* Pricing Information - minlength: 1, maxlength: 15; pattern
> * A-Z
> * a-z
> * 0-9
> * /
> * €
> * space
> 
>* App Icon/Image - dropzone
> * only png und jpeg allowed

<br>
<br>

#### Step 2 - App Page Details

<img width="212" alt="image" src="https://user-images.githubusercontent.com/94133633/211016428-19697dc0-362e-4de9-b955-2feee5f13797.png">

In the Step 2 of the publishing process, the app detail page is getting filled

* app description
* app images
* documents/contract information
* etc.


##### Implementation Details

to be added

<br>
<br>

##### API Details

###### #1 Update App Details
Description

```diff
! PUT /api/apps/appreleaseprocess/{appId}
```

<br>

Request Body

    {
      "title": "string",
      "provider": "string",
      "salesManagerId": "uuid",
      "useCaseIds": [
        "uuid"
      ],
      "descriptions": [
        {
          "languageCode": "alpha2code",
          "longDescription": "string",
          "shortDescription": "string"
        }
      ],
      "supportedLanguageCodes": [
        "string"
      ],
      "price": "string",
      "privacyPolicies": [
        e.g. "COMPANY_DATA"
      ]
    }

<br>

Please note: if a value is send empty, the existing possible saved value will get overwritten with an empty/NULL value.

<br>
<br>


###### #2 DELETE Image/Documents
In case the user identifiers that a wrong image is loaded or the image doesnt fit/has changed; the DELETE endpoint is used to delete doucments linked to the app.
Important: the deletion is not reversable - since the app is still under DRAFT, all app related details will get deleted immediately.

```diff
! Delete: /api/apps/appreleaseprocess/documents/{documentId}
```

<br>

Validations:

* first, check if the user requesting the document deletion belongs to the same company as the user who has initially uploaded the document (acting user company relation needed + the user which is stored in the documents table for the respective document_if as company_user_id
* afterwards; check if the document is assigned to an app (via table offer_assigned_documents)
  * if yes proceed
  * if no, error "document not found"
* next check if the app is in status "CREATED" 
  * if yes proceed
  * if no, error "app is locked"
* check if the document_type is any of the following APP_IMAGE; APP_CONTRACT, ADDITIONAL_DETAILS, APP_LEADIMAGE, APP_TECHNICAL_INFORMATION
  * if yes, proceed
  * if no; error "incorrect document type - not supported for apps"
* validate if the document is unlocked
  * if yes; proceed
  * if no; error  "document is locked"
 

Deletion Flow (if all validations have been successful):
* delete the document (including the relation / link in table offer_assigned_documents)

<br>
<br>

#### Step 3 - Terms & Conditions / Consent

<img width="576" alt="image" src="https://user-images.githubusercontent.com/94133633/223786562-6cc80a68-5299-4708-bc1d-1899dcf3cd23.png">

<br>

###### #1 Retrieve Terms & Conditions
Terms and Conditions are fetched via the endpoint 

```diff
! GET: /api/apps/appreleaseprocess/agreementData
```

<br>

Response Body

    [
      {
        "agreementId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "documentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]


###### #2 Upload document
The user has to upload the app conformity document.

```diff
! PUT: /api/apps/appreleaseprocess/updateappdoc/{appId}/documentType/{documentTypeId}/documents
```

Type: CONFORMITY_APPROVAL_BUSINESS_APPS

<br>
<br>

#### Step 4 - Integration - Role Upload

<br>

<p align="center">
<img width="464" alt="image" src="https://user-images.githubusercontent.com/94133633/223825655-10abc8f9-815e-4bb2-9c4a-33347e763716.png">
</p>

The Role Upload is a mandatory app release process step where the app provider can upload a csv file (template attached) to load user roles and description.
With uploading the csv via the dropzone, a preview section will display the respective roles to be uploaded.

<p align="center">
<img width="464" alt="image" src="https://user-images.githubusercontent.com/94133633/223828948-02846247-2389-4d45-8d93-95c71dba4e01.png">
</p>
 
With approving the upload with the button "Create App Roles" the roles are stored in the portal DB. Keycloak is untouched, since role creation in keycloak will only be relevant if the app instance/client is getting created.

<br>
<br>

##### API Details

###### #1 Upload Roles

```diff
! POST /api/apps/appreleaseprocess/{appId}/role
```

<br>

Request Body

    [
      {
        "role": "string",
        "descriptions": [
          {
            "languageCode": "string",
            "description": "string"
          }
        ]
      }
    ]

<br>
<br>

###### #2 Delete Roles

```diff
! DELETE: /api/apps/appreleaseprocess/{appId}/role/{roleId}
```

<br>
<br>

#### Step 5 - Beta Test Runs

<img width="636" alt="image" src="https://user-images.githubusercontent.com/94133633/223830906-9f682f43-bd7d-4579-881b-53694d7d8611.png">
  
<br>

Only a preview for now

<br>
<br>

#### Step 6 - Validate & Submit for Publishing check

<image></image>
  
<text></text>

##### Implementation Details

With submitting the app for marketplace publishing, the 
* app status is getting updated to "IN_REVIEW"
* CX Admin is informed (via notification) about the needed app release review
* documents linked to the app are set to "LOCKED"

<br>
<br>

##### API Details

###### #1 Get App Details
Description

```diff
! GET: /api/apps/appreleaseprocess/{appId}/appStatus
```

<br>

    {
      "title": "string",
      "provider": "string",
      "leadPictureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "providerName": "string",
      "useCase": [
        "string"
      ],
      "descriptions": [
        {
          "languageCode": "string",
          "longDescription": "string",
          "shortDescription": "string"
        }
      ],
      "agreements": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "consentStatus": "string"
        }
      ],
      "supportedLanguageCodes": [
        "string"
      ],
      "price": "string",
      "images": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ],
      "providerUri": "string",
      "contactEmail": "string",
      "contactNumber": "string",
      "documents": {
        "additionalProp1": [
          {
            "documentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "documentName": "string"
          }
        ],
        "additionalProp2": [
          {
            "documentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "documentName": "string"
          }
        ],
        "additionalProp3": [
          {
            "documentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "documentName": "string"
          }
        ]
      },
      "salesManagerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "privacyPolicies": [
        e.g. "COMPANY_DATA"
      ]
    }

<br>
<br>

###### #2 Submit App for Marketrelease
Description

```diff
! PUT /api/apps/appreleaseprocess/{appId}/submit
```

<br>
<br>

###### #3 Download Document
Description

```diff
! tbd
```

<br>
<br>

