## App



#### App DB Connection

<br>
<img width="1684" alt="image" src="https://user-images.githubusercontent.com/94133633/222970951-6e813f26-fd44-4b8c-87ee-7c33050ae661.png">

<br>
<br>

#### App Images
2 different types of app images do exist

- app lead picture (used for the marketplace app card)
- app detail pictures (used for app details view)

Images are handled inside the portal db. Via the documents table and offer_assigned_documents available app images can get loaded.

Related Endpoints:
- POST: /api/apps/appreleaseprocess/createapp
- PUT: /api/apps/appreleaseprocess/{appId}
- GET /api/apps/appreleaseprocess/{appId}/appStatus
- GET: /api/apps/{appId}

<br>
<br>

#### App Release Date

with the activation of app/service the app release date is getting set

Triggering Endpoints:
PUT: /api/apps/appreleaseprocess/{appId}/approveApp

The app release data is important for the app marketplace; only those apps with a release date in the past are getting displayed.
With the app release date future scenarios such as: release app before publishing can get supported

<br>
<br>

#### App Use Case

app offers are aways use_case linked. 
Table relation use_cases - 1:m - app_assigned_use_cases - m:1 - offers

<br>
<br>

#### App Privacy Policy

"Privacy Policy" information can get collected / stored for offers with type "APP".  
<br>

<p align="center">
<img width="610" alt="image" src="https://user-images.githubusercontent.com/94133633/229378877-a4b6bddc-d77a-46d5-a9a1-1ab17f04b536.png">
</p>

<br>

Related Endpoints:
- POST: /api/apps/appreleaseprocess/createapp 
- PUT: /api/apps/appreleaseprocess/{appId} 
- GET: /api/apps/{appId}
- GET: /api/apps/appreleaseprocess/{appId}/appStatus
- GET: /api/apps/privacyPolicy
<br>

Privacy policy types / labels:
* Company_Data
* User_Data
* Location
* Browser_History
* None


