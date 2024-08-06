# Summary

The main process worker project is the `Processes.Worker` which runs all the processes. It therefor looks up `process_steps` in status `TODO` and their respective `processes` and executes those.

## Processes

The process worker supports the following processes:

- [ApplicationChecklist](../09.%20Process%20Workers/01.%20application_checklist.md) - handles the registration process for a new company
- [DimUserCreation](../09.%20Process%20Workers/02.%20dim_user_creation.md) - handles the creation of technical users in the dim middle layer
- [IdentityProviderProvisioning](../09.%20Process%20Workers/03.%20identity_provider_provisioning.md) - cleans up an identity provider
- [Invitation](../09.%20Process%20Workers/04.%20invitation.md) - handles the invitation of new users
- [Mailing](../09.%20Process%20Workers/05.%20mailing.md) - handles the mail sending
- [NetworkRegistration](../09.%20Process%20Workers/06.%20network_registration.md) - handles the osp registration
- [OfferSubscription](../09.%20Process%20Workers/07.%20offer_subscription.md) - handles the subscription and automatic activation for an offer
- [UserProvisioning](../09.%20Process%20Workers/08.%20user_provisioning.md) - handles the cleanup of users

## Retriggering

The process has a logic to retrigger failing steps. For this a retrigger step is created which can be triggered via an api call to retrigger the step. This logic is implemented separately for each process. In general the retriggering of a step is possible if for example external services are not available. Following is an overview of the linkage for each process step and the api to retrigger them:

| Step Name                                              | Retrigger Possible | Retrigger Endpoint                                                                                                            |
| ------------------------------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| VERIFY_REGISTRATION                                    | NO                 |                                                                                                                               |
| CREATE_BUSINESS_PARTNER_NUMBER_PUSH                    | YES                | api/administration/registration/application/{applicationId}/trigger-bpn                                                       |
| CREATE_BUSINESS_PARTNER_NUMBER_PULL                    | YES                | api/administration/registration/application/{applicationId}/trigger-bpn                                                       |
| CREATE_BUSINESS_PARTNER_NUMBER_MANUAL                  | NO                 |                                                                                                                               |
| CREATE_IDENTITY_WALLET                                 | YES                | api/administration/registration/application/{applicationId}/trigger-identity-wallet                                           |
| RETRIGGER_IDENTITY_WALLET                              | NO                 |                                                                                                                               |
| START_CLEARING_HOUSE                                   | YES                | api/administration/registration/application/{applicationId}/retrigger-clearinghouse                                           |
| RETRIGGER_CLEARING_HOUSE                               | NO                 |                                                                                                                               |
| END_CLEARING_HOUSE                                     | NO                 |                                                                                                                               |
| START_SELF_DESCRIPTION_LP                              | YES                | api/administration/registration/application/{applicationId}/trigger-self-description                                          |
| RETRIGGER_SELF_DESCRIPTION_LP                          | NO                 |                                                                                                                               |
| ACTIVATE_APPLICATION                                   | NO                 |                                                                                                                               |
| RETRIGGER_BUSINESS_PARTNER_NUMBER_PUSH                 | NO                 |                                                                                                                               |
| RETRIGGER_BUSINESS_PARTNER_NUMBER_PULL                 | NO                 |                                                                                                                               |
| OVERRIDE_BUSINESS_PARTNER_NUMBER                       | NO                 |                                                                                                                               |
| TRIGGER_OVERRIDE_CLEARING_HOUSE                        | NO                 |                                                                                                                               |
| START_OVERRIDE_CLEARING_HOUSE                          | YES                | api/administration/registration/application/{applicationId}/override-clearinghouse                                            |
| FINISH_SELF_DESCRIPTION_LP                             | NO                 |                                                                                                                               |
| DECLINE_APPLICATION                                    | NO                 |                                                                                                                               |
| CREATE_DIM_WALLET                                      | YES                | api/administration/registration/application/{applicationId}/retrigger-create-dim-wallet                                       |
| AWAIT_DIM_RESPONSE                                     | NO                 |                                                                                                                               |
| RETRIGGER_CREATE_DIM_WALLET                            | NO                 |                                                                                                                               |
| VALIDATE_DID_DOCUMENT                                  | YES                | api/administration/registration/application/{applicationId}/retrigger-validate-did                                            |
| RETRIGGER_VALIDATE_DID_DOCUMENT                        | NO                 |                                                                                                                               |
| REQUEST_BPN_CREDENTIAL                                 | NO                 |                                                                                                                               |
| STORED_BPN_CREDENTIAL                                  | NO                 |                                                                                                                               |
| REQUEST_MEMBERSHIP_CREDENTIAL                          | NO                 |                                                                                                                               |
| STORED_MEMBERSHIP_CREDENTIAL                           | NO                 |                                                                                                                               |
| TRANSMIT_BPN_DID                                       | YES                | missing                                                                                                                       |
| RETRIGGER_TRANSMIT_DID_BPN                             | NO                 |                                                                                                                               |
| TRIGGER_PROVIDER                                       | YES                | api/administration/subscriptionconfiguration/process/offer-subscription/{offerSubscriptionId}/retrigger-provider-callback     |
| START_AUTOSETUP                                        | NO                 |                                                                                                                               |
| OFFERSUBSCRIPTION_CLIENT_CREATION                      | YES                | api/administration/subscriptionconfiguration/process/offer-subscription/{offerSubscriptionId}/retrigger-create-client         |
| SINGLE_INSTANCE_SUBSCRIPTION_DETAILS_CREATION          | NO                 |                                                                                                                               |
| OFFERSUBSCRIPTION_TECHNICALUSER_CREATION               | YES                | api/administration/subscriptionconfiguration/process/offer-subscription/{offerSubscriptionId}/retrigger-create-technical-user |
| ACTIVATE_SUBSCRIPTION                                  | NO                 |                                                                                                                               |
| TRIGGER_PROVIDER_CALLBACK                              | YES                | api/administration/subscriptionconfiguration/process/offer-subscription/{offerSubscriptionId}/retrigger-provider-callback     |
| RETRIGGER_PROVIDER                                     | NO                 |                                                                                                                               |
| RETRIGGER_OFFERSUBSCRIPTION_CLIENT_CREATION            | NO                 |                                                                                                                               |
| RETRIGGER_OFFERSUBSCRIPTION_TECHNICALUSER_CREATION     | NO                 |                                                                                                                               |
| RETRIGGER_PROVIDER_CALLBACK                            | NO                 |                                                                                                                               |
| TRIGGER_ACTIVATE_SUBSCRIPTION                          | NO                 |                                                                                                                               |
| OFFERSUBSCRIPTION_CREATE_DIM_TECHNICAL_USER            | YES                | missing                                                                                                                       |
| RETRIGGER_OFFERSUBSCRIPTION_CREATE_DIM_TECHNICAL_USER  | NO                 |                                                                                                                               |
| AWAIT_CREATE_DIM_TECHNICAL_USER_RESPONSE               | YES                | missing                                                                                                                       |
| RETRIGGER_AWAIT_CREATE_DIM_TECHNICAL_USER_RESPONSE     | NO                 |                                                                                                                               |
| SYNCHRONIZE_USER                                       | YES                | api/administration/registration/network/{externalId}/retrigger-synchronize-users                                              |
| RETRIGGER_SYNCHRONIZE_USER                             | NO                 |                                                                                                                               |
| TRIGGER_CALLBACK_OSP_SUBMITTED                         | YES                | api/administration/registration/network/{externalId}/retrigger-callback-osp-submitted                                         |
| TRIGGER_CALLBACK_OSP_APPROVED                          | YES                | api/administration/registration/network/{externalId}/retrigger-callback-osp-approve                                           |
| TRIGGER_CALLBACK_OSP_DECLINED                          | YES                | api/administration/registration/network/{externalId}/retrigger-callback-osp-decline                                           |
| RETRIGGER_CALLBACK_OSP_SUBMITTED                       | NO                 |                                                                                                                               |
| RETRIGGER_CALLBACK_OSP_APPROVED                        | NO                 |                                                                                                                               |
| RETRIGGER_CALLBACK_OSP_DECLINED                        | NO                 |                                                                                                                               |
| MANUAL_DECLINE_OSP                                     | NO                 |                                                                                                                               |
| REMOVE_KEYCLOAK_USERS                                  | YES                | missing                                                                                                                       |
| RETRIGGER_REMOVE_KEYCLOAK_USERS                        | NO                 |                                                                                                                               |
| SEND_MAIL                                              | YES                | missing                                                                                                                       |
| RETRIGGER_SEND_MAIL                                    | NO                 |                                                                                                                               |
| INVITATION_CREATE_CENTRAL_IDP                          | YES                | api/administration/invitation/{processId}/retrigger-create-central-idp                                                        |
| INVITATION_CREATE_SHARED_IDP_SERVICE_ACCOUNT           | YES                | api/administration/invitation/{processId}/retrigger-create-shared-idp-sa                                                      |
| INVITATION_ADD_REALM_ROLE                              | YES                | missing                                                                                                                       |
| INVITATION_CREATE_SHARED_REALM                         | YES                | api/administration/invitation/{processId}/retrigger-create-shared-realm-idp-client                                            |
| INVITATION_CREATE_CENTRAL_IDP_ORG_MAPPER               | YES                | api/administration/invitation/{processId}/retrigger-create-central-idp-org-mapper                                             |
| INVITATION_UPDATE_CENTRAL_IDP_URLS                     | YES                | api/administration/invitation/{processId}/retrigger-update-central-idp-urls                                                   |
| INVITATION_CREATE_SHARED_CLIENT                        | YES                | missing                                                                                                                       |
| INVITATION_ENABLE_CENTRAL_IDP                          | YES                | api/administration/invitation/{processId}/retrigger-enable-central-idp                                                        |
| INVITATION_CREATE_DATABASE_IDP                         | YES                | api/administration/invitation/{processId}/retrigger-create-database-idp                                                       |
| INVITATION_CREATE_USER                                 | YES                | api/administration/invitation/{processId}/retrigger-create-user                                                               |
| RETRIGGER_INVITATION_CREATE_CENTRAL_IDP                | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_SHARED_IDP_SERVICE_ACCOUNT | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_ADD_REALM_ROLE                    | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_SHARED_REALM               | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_CENTRAL_IDP_ORG_MAPPER     | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_UPDATE_CENTRAL_IDP_URLS           | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_SHARED_CLIENT              | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_ENABLE_CENTRAL_IDP                | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_USER                       | NO                 |                                                                                                                               |
| RETRIGGER_INVITATION_CREATE_DATABASE_IDP               | NO                 |                                                                                                                               |
| CREATE_DIM_TECHNICAL_USER                              | YES                | missing                                                                                                                       |
| RETRIGGER_CREATE_DIM_TECHNICAL_USER                    | NO                 |                                                                                                                               |
| DELETE_CENTRAL_USER                                    | YES                | api/administration/registration/{processId}/retrigger-delete-centraluser                                                      |
| RETRIGGER_DELETE_CENTRAL_USER                          | NO                 |                                                                                                                               |
| DELETE_COMPANYUSER_ASSIGNED_PROCESS                    | NO                 |                                                                                                                               |
| DELETE_IDP_SHARED_REALM                                | YES                | api/administration/registration/{processId}/retrigger-delete-idpSharedRealm                                                   |
| RETRIGGER_DELETE_IDP_SHARED_REALM                      | NO                 |                                                                                                                               |
| DELETE_IDP_SHARED_SERVICEACCOUNT                       | YES                | api/administration/registration/{processId}/retrigger-delete-idpSharedServiceAccount                                          |
| RETRIGGER_DELETE_IDP_SHARED_SERVICEACCOUNT             | NO                 |                                                                                                                               |
| DELETE_CENTRAL_IDENTITY_PROVIDER                       | YES                |                                                                                                                               |
| RETRIGGER_DELETE_CENTRAL_IDENTITY_PROVIDER             | NO                 | api/administration/registration/{processId}/retrigger-delete-centralIdentityProvider                                          |
| DELETE_IDENTITY_PROVIDER                               | NO                 |                                                                                                                               |

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
