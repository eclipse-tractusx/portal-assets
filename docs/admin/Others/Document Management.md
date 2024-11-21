# Summary

Inside the portal, we have a number of different places to

- upload documents
- view documents
- delete documents

Documents can be templates, but also signed contracts The uploaded documents must be .pdf documents.
<br>
In the DB table we have differentiated between documents which are uploaded by a customer because the document is signed or used as legitimation and those kind of documents which are templates.
<br>

Example User Flow which is supported by the document controller:

<img width="831" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/registration-process-document-storage.png">

<br>
<br>

# Solution Details

## Database

Documents are managed inside the postgresql db.

Mainly 4 tables are used for the documents itself

- documents
- document_types
- document_status
- offer_assigned_documents
- agreement_assigned_documents

<br>

<img width="1367" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/db-schema-documents.png">

<br>
<br>

## Document Storage

The uploaded documents are getting stored in the postgresql db.  
Its possible to change this in a later stage to another tool such as a document storage of any cloud provider or a network/local file store. Storing on dev and int the documents inside the db is providing the necessary flexibility by still considering document access limitations/security.

<br>
<br>

## Document Deletion

The document deletion is designed and implemented in a very limited functionality. The reason of the limitation is extremely relevant since the documents are mostly legal binding agreements, contracts or authentication certificates.  
The deletion of legal binding documents will lead to an immense issue on the audit area, if not done carefully.  
Based on the reasons above, the document deletion is handled in 2 different functions
<br>

- Deletion triggered by the enduser  
   The deletion triggered by the enduser is possible as long as the document is in status "PENDING". As soon as any other state is reached the deletion wont be possible anymore.

- Deletion triggered by an automatic job running at a specific time (batch job)  
   Specific configured batch job running nigthly to delete INACTIVE documents with a certain age.

<br>
<br>

## Document Storage Size

Uploading documents is limited to 8MB. The configuration for the maximum file size is set in ingress (nginx). See the last line in the screenshot below:
<br>

<img width="600" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/document-upload-restrictions.png">

Additionally document size validation on FE was implemented lately where the size depends on the process.  
Inside the registration sizes can be following:
<br>

- Registration => up to 8MB
- App Release Process => up to 1MB
- etc.

<br>
<br>

# Implementation Details

<br>

## #1 Get Documents

Overview of all document related GET Endpoints:
<br>

| WHAT                 | Endpoint                                                                        | Who can call the endpoint | What can I retrieve                    |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------- | -------------------------------------- |
| CX Frame Docs        | GET: /api/registration/registrationDocuments/{documentId}                       | All                       | All CX Frame flagged documents         |
| CX Frame Docs        | GET: /api/administration/frameDocuments/{documentId}                            | All                       | All CX Frame flagged documents         |
| Registration Docs    | GET: /api/registration/documents/{documentId}                                   | All                       | Only my Company Docs                   |
| Registration Docs    | GET: /api/administration/documents/{documentID}                                 | All                       | Only my Company Docs                   |
| Registration Docs    | GET: /api/administration/registration/documents/{documentId}                    | Operator                  | Registration docus of all companies    |
| Registration Docs    | GET: /api/administration/documents/selfDescription/{documentId}                 | All                       | All SDs flagged documents              |
| App Documents        | GET: /api/apps/{appId}/appDocuments/{documentId}                                | All                       | All app offer assigned docs            |
| Service Documents    | GET: /api/services/{serviceId}/serviceDocuments/{documentId}                    | All                       | All service offer assigned docs        |
| Company Certificates | GET: /api/administration/companydata/companyCertificates/{documentId}           | All                       | My Company Owned Certificate Documents |
| Company Certificates | GET: /api/administration/companydata/companyCertificates/documents/{documentId} | All                       | Other Companies Certificate Documents  |

<br>

In all those endpoints, the document itself will get retrieved (e.g. pdf, json, png, etc.)

<br>
<br>

## #2 POST Document

Store documents inside the document table in portal.  
Document will get stored with linkage to the user and document type.
<br>

```diff
! POST /api/registration/application/{applicationId}/documentType/{documentTypeId}/documents
```

```diff
! PUT: /api/apps/appreleaseprocess/updateappdoc/{appId}/documentType/{documentTypeId}/documents
```

<br>
<br>

## #3 Ad-Hoc Delete Documents

As mentioned above, the deletion triggered by the enduser is possible as long as the document is in status "PENDING". As soon as any other state is reached the deletion wont be possible anymore.
<br>

```diff
! Delete: /api/registration/documents/{documentId}
```

<br>
<br>

## #4 Batch Delete Documents

Scheduled deletion job, configurable to run overnight.

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
