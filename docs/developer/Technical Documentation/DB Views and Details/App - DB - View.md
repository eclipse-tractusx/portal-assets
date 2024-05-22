## App

#### App DB Connection

<br>
<img width="1684" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/db-schema-offers.png">

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
<img width="610" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/db-schema-offer-privacy-policy.png">
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

- Company_Data
- User_Data
- Location
- Browser_History
- None

#### App Date Last Changed

The date_last_changed is getting automatically updated if any of the following endpoints is triggered:

<br>

###### App Change

- /api/apps/AppChange/{appId}/role/activeapp
- /api/apps/AppChange/{appId}/appupdate/description
- /api/apps/AppChange/{appId}/appLeadImage
- /api/apps/AppChange/{appId}/subscription/{subscriptionId}/tenantUrl

 <br>

###### App Release

- /api/apps/AppReleaseProcess/updateappdoc/{appId}/documentType/{documentTypeId}/documents
- /api/apps/AppReleaseProcess/{appId}/role
- /api/apps/AppReleaseProcess/consent/{appId}/agreementConsents
- /api/apps/AppReleaseProcess/createapp
- /api/apps/AppReleaseProcess/{appId}
- /api/apps/AppReleaseProcess/{appId}/technical-user-profiles

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
