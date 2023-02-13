# Summary

The "App Release Publishing Process" is accessible via the "App Release Process" as well as the "App Management".  
<br>
The App Provider has access to both of the start screens to trigger a new app for marketplace publishing.  
<br>
The app publishing process includes the submission of relevant app details, adding app images, documents as well as testing and technical connection (where suitable).  


# Implementation

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
<br>

###### #2 Get Use Cases
Get use cases api endpoint is used to provide the user a dropdown function in which the provider can select which use cases the respective app serves

<img width="325" alt="image" src="https://user-images.githubusercontent.com/94133633/211015522-2b222613-61d9-4c9c-b1cf-343aff353628.png">

```diff
! GET /api/administration/staticdata/usecases
```

<br>
<br>

###### #3 Get Sales Manager
Get possible sales manager (under my company) which I can add as Sales Manager of my app. The Sales Manager is useful to assign specific notifications when an app get's a subscribe request.

```diff
! GET /api/apps/appreleaseprocess/ownCompany/salesManager
```

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

###### #5 Create App
Created a new app for the current active app provider

```diff
! POST /api/apps/createapp
```

Endpoint exception handling:

....more to add....
 SalesManaer
can be NULL
validate if the SalesManager uuid is a valid uuid of an user with the role "SalesManager"
validation is needed if the SalesManager belongs to the same company as the acting user 


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
>* Use Case/Category - Dropdown element (see also https://portal.dev.demo.catena-x.net/_storybook/?path=/story/form--multi-select-list) - pattern:
> * A-Z
> * a-z
> 
>* App Language - Multi Select List (see also https://portal.dev.demo.catena-x.net/_storybook/?path=/story/form--multi-select-list) - pattern:
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
>* App Icon/Image - dropzone (see also https://portal.dev.demo.catena-x.net/_storybook/?path=/story/dropzone–dropzone)
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

###### #1 ...
Description

```diff
! endpoint
```

<br>
<br>


###### #2 ...
Description

```diff
! endpoint
```

<br>
<br>


###### #3 ...
Description

```diff
! endpoint
```

<br>
<br>

>Input Validations
>
>* LongDescription (en) - maxlength: 2000; pattern:
> * a-zA-Z0-9 !?@&#'"()[]_-+=<>/*.,;:
> 
>* LongDescription (de) - maxlength: 2000; pattern:
> * a-zA-ZÀ-ÿ0-9 !?@&#'"()[]_-+=<>/*.,;:
>* Image
> * only png and jpeg are allowed
>* Provider Homepage
> * A-Z
> * a-z
> * .
> * :
> * @
> * 0-9
> * !
> * &
>* Email Contact
> * A-Z
> * a-z
> * .
> * :
> * @
> * 0-9
> * !
> * &
>* Phone Contact
> * +
> * (
> * )
> * 0-9

<br>
<br>

#### Step 3 - Terms & Conditions / Consent

<image></image>
  
<text></text>


##### Implementation Details

to be added

<br>
<br>

##### API Details

###### #1 ...
Description

```diff
! endpoint
```

<br>
<br>

#### Step 4 - Tenant Concept and Integration

<image></image>
  
<text></text>


##### Implementation Details

to be added

<br>
<br>

##### API Details

###### #1 ...
Description

```diff
! endpoint
```

<br>
<br>

#### Step 5 - Beta Test Runs

<image></image>
  
<text></text>


##### Implementation Details

to be added

<br>
<br>

##### API Details

###### #1 ...
Description

```diff
! endpoint
```

<br>
<br>

#### Step 6 - Validate & Submit for Publishing check

<image></image>
  
<text></text>

##### Implementation Details

to be added

<br>
<br>

##### API Details

###### #1 ...
Description

```diff
! endpoint
```

<br>
<br>
