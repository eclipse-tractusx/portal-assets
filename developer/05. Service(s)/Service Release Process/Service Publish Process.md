# Summary

The service publish process is currently under creation and will be UI supported in release 3.1 or 3.2

Till that, the service publication is only available via api endpoints. Users can trigger those endpoints to generate a new service. The service approval (which is needed to get the service published on the marketplace, needs to get triggered by the portal administrator)

<br>
<br>

Links:  

[Design](/docs/Service(s)/Release-Process/Design.md)  
[FAQ](/docs/Service(s)/Subscription/FAQ.md)

<br>
<br>

# Implementation

### #1 Create Service Offering

Via create service offerings; service provider can initiate the service release process by creating the offer in an initial state (not yet ready for the marketplace offering)
<br>

```diff
! POST: /api/services/addservice
```

<br>

Request body:
<br>

    {
      "title": "string",
      "price": "string",
      "contactEmail": "string",
      "salesManager": "uuid",
      "descriptions": [
        {
          "languageCode": "e.g. de",
          "longDescription": "string",
          "shortDescription": "string"
        }
      ],
      "serviceTypeIds": [
        "e.g. DATASPACE_SERVICE"
      ]
    }
    
Hints:
* Sales Manager: uuid company user with role sales manager
* LanguageCode: two digit language short code (e.g. en, de, jp, pt, etc.)
* Service Type Ids: service type label (currently available: DATASPACHE_SERVICE & CONSULTING_SERVICE)
    
<br>
<br>

### #2 Update Service Offering

Service Providers are able to update their own service offering by calling the put endpoint.
<br>

```diff
! PUT: /api/services/{serviceId}
```

<br>

Request body:
<br>

    {
      "title": "string",
      "descriptions": [
        {
          "languageCode": "e.g. de",
          "longDescription": "string",
          "shortDescription": "string"
        }
      ],
      "serviceTypeIds": [
        "e.g. DATASPACE_SERVICE"
      ],
      "price": "string",
      "contactEmail": "string",
      "salesManager": "uuid"
    }

<br>
<br>

### #3 Submit new Service Offering for release/publishing

The endpoint is used to submit a service for release/publish validation by the operator of the marketplace.  
Services created by a company can get pushed to the "In Review" state of the service is owned by the company and all respective needed data inputs are filled.
<br>

```diff
! PUT /api/services/{serviceId}/submit
```

<br>
Please note, a notification will get created and is documented in the notification service documentation: Notification Service

<br>
<br>
