## Summary

The "App Release Publishing Process" is accessible via the "App Release Process" as well as the "App Management".  
<br>
The App Provider has access to both of the start screens to trigger a new app for marketplace publishing.  
<br>
The app publishing process includes the submission of relevant app details, adding app images, documents as well as testing and technical connection (where suitable).

## Implementation

#### Trigger the Publishing Process

Option 1: Via the app management page

<img width="500" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-overview-register-new-app.png">

<br>
<br>

Option 2: Via the App Release Process

<img width="500" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/start-app-creation.png">

<br>
<br>

#### Step 1 - App Card Details

<img width="373" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-start-screen.png">

In the Step 1 of the publishing process, the app card details are getting filled first

- app name
- provider
- app lead picture
- language support
- pricing information
- etc.

##### Implementation Details

- create a new app in table portal.apps with the data send in the request body
  - store the value "title" in the attribute name
  - store the value "provider" in the attribute provider
  - store the value "leadPictureUri" in the attribute thumbnail_url
  - the status of the app is getting set to "CREATED" => "1"
- portal.apps attribute provider_company_id is set based on the users company id
- the "descriptions" in de and en are stored in the table portal.app_descriptions (linked to the table portal.apps via the new created app id)
- the "supportedLanguageCodes" are stored in the table portal.app_languages (linked to the table portal.apps via the new created app id)
- the "useCaseIds" (supported app use_case(s)) are stored in the portal.app_assigned_use_cases table (linked to the table portal.apps via the new created app id)
- the "price" is stored in the portal.app_assigned_licenses table (linked to the table portal.apps via the new created app id)

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
             "language": "de",
             "languageLongNames": [
                 {
                    "language": "de",
                    "long_description": "deutsch"
                 },
                 {
                    "language": "en",
                    "long_description": "german"
                 }
             ]
          },
        ...
     ]

<br>
<br>

###### #2 Get Use Cases

Get use cases api endpoint is used to provide the user a dropdown function in which the provider can select which use cases the respective app serves

<img width="325" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-categories.png">

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
Using the document id of the response body, the document base64 encoding can get retrieved and turned to the actual image.  
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

In case the user identifiers that a wrong image is loaded or the image doesn't fit/has changed; the DELETE endpoint is used to delete documents linked to the app.
Important: the deletion is not reversible - since the app is still under DRAFT, all app related details will get deleted immediately.

```diff
! Delete: /api/apps/appreleaseprocess/documents/{documentId}
```

<br>

Validations:

- first, check if the user requesting the document deletion belongs to the same company as the user who has initially uploaded the document (acting user company relation needed + the user which is stored in the documents table for the respective document_if as company_user_id
- afterwards; check if the document is assigned to an app (via table offer_assigned_documents)
  - if yes proceed
  - if no, error "document not found"
- next check if the app is in status "CREATED"
  - if yes proceed
  - if no, error "app is locked"
- check if the document_type is any of the following APP_IMAGE; APP_CONTRACT, ADDITIONAL_DETAILS, APP_LEADIMAGE, APP_TECHNICAL_INFORMATION
  - if yes, proceed
  - if no; error "incorrect document type - not supported for apps"
- validate if the document is unlocked
  - if yes; proceed
  - if no; error "document is locked"

Deletion Flow (if all validations have been successful):

- delete the document (including the relation / link in table offer_assigned_documents)

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

- SalesManager can be NULL
- validate if the SalesManager uuid is a valid uuid of an user with the role "SalesManager"
- validation is needed if the SalesManager belongs to the same company as the acting user
- PrivacyPolicies must be one of the allowed values as per the static data table

<br>
<br>

> Input Validations
>
> - App Title - minlength: 5, maxlength: 40; pattern:
> - A-Z
> - a-z
> - .
> - :
> - \_
> - -
> - @
> - &
> - 0-9
> - space
> - App Provider - minlength: 3, maxlength: 30; pattern:
> - A-Z
> - a-z
> - space
> - Short Description (en) - minlength: 10, maxlength: 255; pattern:
> - a-zA-Z0-9 !?@&#'"()\_-=/\*.,;:
> - Short Description (de) - minlength: 10, maxlength: 255; pattern
> - a-zA-ZÀ-ÿ0-9 !?@&#'"()\_-=/\*.,;:
> - Use Case/Category - Dropdown element - pattern:
> - A-Z
> - a-z
> - App Language - Multi Select List - pattern:
> - A-Z
> - a-z
> - space
> - Pricing Information - minlength: 1, maxlength: 15; pattern
> - A-Z
> - a-z
> - 0-9
> - /
> - €
> - space
> - App Icon/Image - dropzone
> - only png und jpeg allowed

<br>
<br>

#### Step 2 - App Page Details

<img width="212" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-app-details-input.png">

In the Step 2 of the publishing process, the app detail page is getting filled

- app description
- app images
- documents/contract information
- etc.

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
      ],
      "providerUri": "string",
      "contactEmail": "string",
      "contactNumber": "string"
    }

<br>

Please note: if a value is send empty, the existing possible saved value will get overwritten with an empty/NULL value.

<br>
<br>

###### #2 DELETE Image/Documents

In case the user identifiers that a wrong image is loaded or the image doesn't fit/has changed; the DELETE endpoint is used to delete documents linked to the app.
Important: the deletion is not reversible - since the app is still under DRAFT, all app related details will get deleted immediately.

```diff
! Delete: /api/apps/appreleaseprocess/documents/{documentId}
```

<br>

Validations:

- first, check if the user requesting the document deletion belongs to the same company as the user who has initially uploaded the document (acting user company relation needed + the user which is stored in the documents table for the respective document_if as company_user_id
- afterwards; check if the document is assigned to an app (via table offer_assigned_documents)
  - if yes proceed
  - if no, error "document not found"
- next check if the app is in status "CREATED"
  - if yes proceed
  - if no, error "app is locked"
- check if the document_type is any of the following APP_IMAGE; APP_CONTRACT, ADDITIONAL_DETAILS, APP_LEADIMAGE, APP_TECHNICAL_INFORMATION
  - if yes, proceed
  - if no; error "incorrect document type - not supported for apps"
- validate if the document is unlocked
  - if yes; proceed
  - if no; error "document is locked"

Deletion Flow (if all validations have been successful):

- delete the document (including the relation / link in table offer_assigned_documents)

<br>
<br>

###### #3 Display PrivacyPolicies

Privacy Policy options/enums are fetched from the portal db to display the select option to the user.

```diff
! GET /api/apps/appreleaseprocess/privacyPolicies
```

<br>

    {
      "privacyPolicies": [
        "COMPANY_DATA"
      ]
    }

<br>

following translation for the privacy policy tags

| DB Response       | UI Tag Name     |
| ----------------- | --------------- |
| "COMPANY_DATA“    | Company Data    |
| "USER_DATA“       | User Data       |
| "LOCATION"        | Location        |
| "BROWSER_HISTORY" | Browser History |
| "NONE"            | None            |

<br>

Design:

<img width="676" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/privacy-information-selection-options.png">

<br>

In case the privacy policies can not get loaded, the response will look like defined below:

<img width="658" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/privacy-information-error.png">

<br>
<br>

### Step 3 - Terms & Conditions / Consent

<br>

This step in the app release process is ensuring that your application meets the marketplace's standards and complies with all legal and regulatory requirements.
Following actions are covered in the step:

* Agreement to Marketplace Rules and Terms & Conditions
* Upload of App Dataspace Conformity Certification

<br>

<img width="576" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-consent-contract-input.png">

<br>
<br>

### Agreement to Marketplace Rules and Terms & Conditions

Before the app provider can proceed with the release process, they first must agree to the marketplace's rules and Terms & Conditions. This agreement is essential for ensuring that the provider app adheres to the marketplace's quality standards, operational guidelines, and legal requirements.
To display the relevant agreements, respective linked documents and to store the provider consent, the following endpoints are to be used:

* GET /api/apps/appreleaseprocess/agreementData - used to fetch all necessary appReleaseProcess agreements
* GET /api/administration/documents/frameDocuments/{documentId} - used to enable the user to access agreement documents
* POST /api/apps/appreleaseprocess/consent/{appId}/agreementConsents - post consent
* GET /api/apps/AppReleaseProcess/{appId}/appStatus - to check the current given consent status

<br>

#### #1 Retrieve Terms & Conditions

Terms and Conditions are fetched via the endpoint

```diff
! GET: /api/apps/appreleaseprocess/agreementData
```

<br>

Response Body

    [
      {
        "agreementId": "uuid",
        "name": "string",
        "documentId": "uuid"
      }
    ]

<br>

Style

If documentId inside response body is != NULL display the respective agreement as link - example:

<img width="591" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/consent-contract-tickbox-document.png">

<br>

If the documentId is NULL, the agreement is displayed without link (as currently implemented) - example:

<img width="590" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/consent-contract-tickbox-nodocument.png">

<br>
<br>

#### #2 Retrieve Documents

Terms and Conditions with an document ID in API endpoint #1 can get retrieved via the document endpoint GET /frameDocuments/{documentId}

```diff
Get: /api/administration/documents/frameDocuments/{documentId}
```

<br>

Response Body

    document file

<br>
<br>

<br>
<br>

#### #3 Store Consent for Agreements

The given consent or the unapproved consent for the needed agreements are stored via the POST endpoint.
The endpoint will store the newly added agreement status as well as update existing consent status if necessary.

```diff
! POST: /api/apps/appreleaseprocess/consent/{appId}/agreementConsents
```

<br>

Response Body

    {
      "agreements": [
        {
          "agreementId": "uuid",
          "consentStatus": "ACTIVE"
        }
      ]
    }

<br>
<br>

### Conformity Certification

The Service Dataspace Conformity Certification is a document that certifies that the service provider service complies with specific data handling, privacy, and security standards. This certification is crucial for marketplaces that prioritize the safety and privacy of their users.
To support the conformity certificate upload, following endpoints are available:

* GET /api/apps/appeReleaseProcess/{appId}/appStatus - to retrieve already uploaded certificates (if any existing)
* PUT /api/apps/appreleaseprocess/updateappdoc/{appId}/documentType/{documentTypeId}/documents - to store the conformity certificate
* DELETE /api/apps/appreleaseprocess/documents/{documentId} - used to delete the conformity certificate

Note, only PDF is supported.

<br>


#### #1 Upload Document

The user has to upload the app conformity document.

```diff
! PUT: /api/apps/appreleaseprocess/updateappdoc/{appId}/documentType/{documentTypeId}/documents
```

Type: CONFORMITY_APPROVAL_BUSINESS_APPS

<br>

#### #2 DELETE Document

In case the user identifiers that a wrong document got uploaded in the respective step, the DELETE endpoint is used to delete documents linked to the app.
Important: the deletion is not reversible - since the app is still under DRAFT, all app related details will get deleted immediately.

```diff
! DELETE /api/apps/appreleaseprocess/documents/{documentId}
```

<br>
<br>

<br>
<br>

#### Step 4 - Integration - Role Upload

<br>

<p align="center">
<img width="464" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/technical-integration-file-upload.png">
</p>

The Role Upload is a mandatory app release process step where the app provider can upload a csv file (template attached) to load user roles and description.
With uploading the csv via the dropzone, a preview section will display the respective roles to be uploaded.

<p align="center">
<img width="464" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/technical-integration-file-upload-successful.png">
</p>
 
With approving the upload with the button "Create App Roles" the roles are stored in the portal DB. Keycloak is untouched, since role creation in Keycloak will only be relevant if the app instance/client is getting created.

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

<img width="636" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-beta-test.png">
  
<br>

Only a preview for now

<br>
<br>

#### Step 6 - Validate & Submit for Publishing check

<img width="224" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/app-creation-validation-publishing.png">
  
<text></text>

##### Implementation Details

With submitting the app for marketplace publishing, the

- app status is getting updated to "IN_REVIEW"
- CX Admin is informed (via notification) about the needed app release review
- documents linked to the app are set to "LOCKED"

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
      "leadPictureId": "uuid",
      "providerName": "string",
      "useCase": [
        {
          "id": "uuid",
          "label": "string"
        }
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
          "id": "uuid",
          "name": "string",
          "consentStatus": "string"
        }
      ],
      "supportedLanguageCodes": [
        "string"
      ],
      "price": "string",
      "images": [
        "uuid"
      ],
      "providerUri": "string",
      "contactEmail": "string",
      "contactNumber": "string",
      "documents": {
        "additionalProp1": [
          {
            "documentId": "uuid",
            "documentName": "string"
          }
        ]
      },
      "salesManagerId": "uuid",
      "privacyPolicies": [
        e.g. "COMPANY_DATA"
      ]
    }

<br>
<br>

###### #2 Submit App for Marketplace Release

Description

```diff
! PUT /api/apps/appreleaseprocess/{appId}/submit
```

Validations:

- validates document upload (lead image, app image, conformity document)
- validates the signed agreements
- validates if roles are uploaded
- validates if technical user profile is configured
- validates if privacy policy is set

<br>
<br>

###### #3 Download Document

Conformity Document as well as the app specific documents can get downloaded by the user by clicking on the document name.
The GET document endpoint is getting triggered and document downloaded.

```diff
! GET /api/apps/{appId}/appDocuments/{documentId}
```

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
