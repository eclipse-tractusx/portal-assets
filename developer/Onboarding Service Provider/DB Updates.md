

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







