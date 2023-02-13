## App



#### App DB Connection

<img width="800" alt="image" src="https://user-images.githubusercontent.com/94133633/217113666-7ef17e1f-3698-49bc-a4fa-59141366a530.png">


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
