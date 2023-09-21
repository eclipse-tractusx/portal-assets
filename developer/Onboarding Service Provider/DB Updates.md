

### Enable OSP Provider IdPs

....

<img width="779" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/57447ebf-1d56-48e4-a3ee-d8a017a2e605">

<br>
<br>

- added "Identity_Provider_Types" table which is connected to portal.identity_providers table
- added inside the new table "Identity_Provider_Types" an id as well as a label. Labels are defined below:
  - own
  - managed
  - shared
- additionally a new attribute identity_providers.owner_id is added
  - in case the type is "own" - the owner is always the same company as the IdP connected company
  - in case the type is "managed" - the owner is the company which created the IdP (OSP or Operator)
  - in case the type is "shared" - the owner is the same company as the IdP connected company

the identity_providers.owner is important to define which companies are able to create users linked to this idp

<br>
<br>

Migration

For each esiting idp data set inside the table xxxxx; the following values will get set:
* idp owner
* idp type
 
Logic:

* all "KEYCLOAK_SHARED" IdPs got the idp type "3" set ("3" = "SHARED")
* all "KEYCLOAK_SHARED" IdP categories have been changed to "OIDC"
* "KEYCLOAK_OIDC" got renamed to "OIDC"
* "KEYCLOAK_SAML" got renamed to "SAML"
* all "OIDC" & "SAML" IdPs got the idp type "1" set ("1" = "owned")
* all "OIDC" and "SAML"  IdPs need to have the "Customer" set as IdP owner

<br>
<br>

### Enable Application Types

....

<img width="427" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/7054e023-6b1c-4b04-933d-ab760f8eb821">

<br>
<br>

"onboarding_service_provider_id" => nullable
"external" => enum; 1 = "INTERNAL", 2 = "EXTERNAL"

<br>
<br>

#### API Create new IdP connection

```diff
Endpoint POST: api/administration/identityprovider/owncompany/identityproviders
```

got enahnced by adding the typeId* inside the 

*typeIds: MANAGED and OWN are supported; SHARED not - user cant create on request a SHARED IdP


Validations:

"identityProviderType: "managed"" is only allowed/possible if the acting user assigned company is either a OSP or an operator (to be checked via company_assigned_role)
"identityProviderType: "own"" is allowed no matter which role the company of the acting user owns
 "identityProviderType: "shared"" is allowed

<br>
<br>

Business Logic Change:

no matter which identityProviderType is used, store the user assigned company as identity_providers.owner

<br>
<br>

#### API Update IdP Config

```diff
PUT /api/administration/identityprovider/owncompany/identityproviders/{identityProviderId}
```

when calling the endpoint - validate the acting user assigned company and check if the company is listed as the idp owner (via identity_providers.owner)
  * if yes, proceed
  * if no, exception needed - "User not allowed to run the change for identity provider {identityProviderId}"

<br>
<br>

#### API GET IdPs

```diff
GET: api/administration/identityprovider/owncompany/identityproviders
```

keep the existing business logic in place which is retrieving the company idp's based on the data available in portal.company_identity_providers
additionally include those idps where the user acting company is mentioned as "owner" inside identity_providers.owners
add inside the response body the identity_provider_type (please use the "label" not the "id")

<br>
<br>

 #### API DELETE IdPs

```diff
DELETE /api/administration/identityprovider/owncompany/identityproviders/{identityProviderId}
```

interim only possible for SHARED AND OWN IdPs

<br>
<br>

### IDP Deletion

<p align="center">
<img width="786" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/845ed775-f581-49ef-813d-5fb2fa72d2e1">
</p>

<br>

To delete an IdP, the IdP must be first of all disabled.
Without disabling the IdP a deletion will not be offered/possible.
As soon as the IdP got disabled; the deletion can get triggered. Please note - deletions can't get reverted and will directly take place.
If there are users assigned to this IdP only, those users won't be able to login again until those users are migrated to another IdP.

Implementation details:

* [ ] "Delete IdP" option is available under the "Action" sub-menu
* [ ] "Delete IdP" option is only visible for IdPs which are deactivated
* [ ] when clicking on "Delete IdP" the endpoint to delete the IdP (already implemented) is running, till the delete process was successful/unsuccessful the user should see a "load" icon inside the sub-menu and cant re-trigger the menu item
* [ ] if the idp delete is successful, the respective information "IdP got deleted" is displayed on the top right and auto closes after 5 seconds (see design below) and the idp is gone from the idp list on the main page
* [ ] if the idp delete is unsuccessful, same as for the success the error is getting displayed on the top right; with the message "Something went wrong. IdP got not deleted."

<br>
<br>

The successful deletion is confirmed with an toast message.
In case the deletion fails, the user is getting informed by the same method.
In case of an failure the operator should get contacted.

<br>
<br>

### IDP Configuration

<br>

<p align="center">
<img width="680" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/59a5444f-c789-4d0f-8473-9618983bd711">
</p>

<br>

The configuration of the IdP includes the
* Display Name - displayed in the login screen on the company select page - please use a name which the user can relate too; also its important to use a unique value
* Identity Provider Type - sets the type of the IdP; own in case the new configured IdP is used for the own company only; managed if the new configured IdP is supposed to get used for thrid parties - this is only possible for OSPs and OpCos
* Authentication Method - as per latest standards only OIDC is supported
<br>

Implementation details:

* [ ] if the user clicks on the action button "create new IdP" the overlay (see above) is getting displayed with the new design
* [ ] the overlay has an "cancel" (not "back") button which is clickable by the user and results into an closed overlay
* [ ] the button "create IdP entry" is only active if the Display Name is entered
* [ ] "create IdP entry" needs to support load function as long as the backend API did not response to the FE - the user should be only able to click the button once and the button should display a load element till backend response is available.
* [ ] if the "create IdP entry" fails, display inside the overlay an error and let the user not direct to the next page (design support to be requested by Anni - I informed her already)

<br>
<br>

<p align="center">
<img width="683" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/e98d5fa8-9fe4-4200-af31-8c1fa4cd3586">
</p>

<br>

The configuration of the IdP includes the
* metadata url - this is the configuration url - public available/accessible to to fetch the customer idp config details (such as: logout url, userinfo url, redirect url, etc.)
* client id - generated on the customer IdP to allow the CX idp to connect for user federation between the customer idp and the CX idp
* secret - generated on the customer IdP to allow the CX idp to connect for user federation between the customer idp and the CX idp

<br>

Implementation details:

* [ ] if the user clicks on the action button "create IdP entry" the configuration overlay (see above) is getting displayed with the new design
* [ ] all information displayed in the blue table section (bottom) are fetched from the api (as already implemented in the current screen by martin); all other fields are input fields and need input patterns and error messages - please check if those are implemented. If not comment in this ticket to get the respective pattern from Julia Jeroch 
* [ ] add question mark icons for the different input fields via locale files (this should be already implemented, please check if it already supports multi language)
* [ ] metadata url icon is a copy icon which acts on hover as well as on click. When clicking the metadata url is getting saved inside the clipboard and icon turns green to show the user that the "save" was successful. Please recheck the behavior with Anni to also get her design confirmation on the function 
* [ ] as soon as all input fields are added with content without errors, the user can click "Save Metadata"
* [ ] "Save Metadata" needs to support load function as long as the backend API did not response to the FE - the user should be only able to click the button once and the button should display a load element till backend response is available.
* [ ] if the "Save Metadata" fails, display inside the overlay an error and let the user not direct to the next page

<br>
<br>

<p align="center">
<img width="682" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/1aed7ae6-d88c-4165-a9f1-2a42ff35d8c8">
</p>

<br>

The configuration of the IdP includes the
* metadata url - this is the configuration url - public available/accessible to to fetch the customer idp config details (such as: logout url, userinfo url, redirect url, etc.)
* client id - generated on the customer IdP to allow the CX idp to connect for user federation between the customer idp and the CX idp
* secret - generated on the customer IdP to allow the CX idp to connect for user federation between the customer idp and the CX idp

<br>

Implementation details:

* [ ] if the user clicks on the action button "save metadata" the configuration overlay (see above) is getting displayed with the new design
* [ ] with the back button the user gets directed to the previous screen (note - currently we can not display any pre-entered data inside the screen - but its planned to do this asap) - means display "***" for the client secret, display the client id and the metadata url (currently this is not possible - we should discuss this as soon as I am back from vacation)
* [ ] the input fields needs input pattern, error message and support icon with multi language support
* [ ] if the input field is filled, the "connect" button will be active and clickable
* [ ] "connect" needs to support load function as long as the backend API did not response to the FE - the user should be only able to click the button once and the button should display a load element till backend response is available.
* [ ] if the "connect" fails, display inside the overlay an error and let the user not direct to the next page

<br>
<br>

<p align="center">
<img width="684" alt="image" src="https://github.com/catenax-ng/tx-portal-assets/assets/94133633/bf670818-6fab-4a75-8ace-afad4e0132ab">
</p>

<br>

Implementation details:

* n/a

<br>
<br>




