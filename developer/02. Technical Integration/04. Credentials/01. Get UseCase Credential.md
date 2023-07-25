## Use Case Credentials

The use case participation page is created to enable data provider/consumer and solution providers to view their use case participation and to request the participation for new use cases.
The use case participation is a verified credential which is stored on the company wallet which generates trust and liability in the network. The company signing the framework agrees to the use case date sharing rules.

Functional Description: [here](/docs/06.%20Certificates/01.%20UseCase%20Participation.md)

### Displaying available Credential Types

<br>
<img width="636" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/c5ded524-278e-4995-8013-3987a3af7938">
<br>
<br>

The available credential types are fetched from the portal db company_ssi_details and verified_credential_external_type_use_case_detail_versions.
The api response (see below) automatically includes the "ssiDetailData" which include the actual acting user company credential status. (e.g. if the company has one or several credentials of the use case framework requested or active already, it will be shown/displayed in the "ssiDetailData" section)

```diff
! GET /api/administration/companydata/useCaseParticipation
```

<br>

Request Body

    [
      {
        "useCase": "string",
        "description": "string",
        "credentialType": "e.g. TRACEABILITY_FRAMEWORK",
        "verifiedCredentials": [
          {
            "externalDetailData": {
              "id": "uuid",
              "verifiedCredentialExternalTypeId": "e.g. TRACEABILITY_CREDENTIAL",
              "version": "string",
              "template": "string",
              "validFrom": "date",
              "expiry": "date"
            },
            "ssiDetailData": {
              "credentialId": "uuid",
              "participationStatus": "e.g. PENDING",
              "expiryDate": "uuid",
              "document": {
                "documentId": "uuid",
                "documentName": "string"
              }
            }
          }
        ]
      }
    ]
     
<br>
<br>

### Submit Credential request

As part of the credential request submission (which is only possible if there is no PENDING request for the credential and version existing yet) the signed framework agreement need to get submitted.

```diff
! POST /api/administration/companydata/useCaseParticipation
```

<br>

Request Body

    {
      "verifiedCredentialTypeId": "uuid from the GET call",
      "credentialType": "string from the GET call",
      "document": "document file (only pdf are allowed)"
    } 


For the documents only pdf documents are allowed till 1 MB


<br>
<br>



