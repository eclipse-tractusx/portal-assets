# Summary

The main process worker project is the `Processes.Worker` which runs all the processes. It therefor looks up `process_steps` in status `TODO` and their respective `processes` and executes those.

## Processes

The process worker supports the following processes:

- [ApplicationChecklist](/docs/developer/09.%20Process%20Workers/01.%20application_checklist.md) - handles the registration process for a new company
- [DIMUserCreation](/docs/developer/09.%20Process%20Workers/02.%20dim_user_creation.md) - handles the creation of technical users in the DIM middle layer
- [IdentityProviderProvisioning](/docs/developer/09.%20Process%20Workers/03.%20identity_provider_provisioning.md) - cleans up an identity provider
- [Invitation](/docs/developer/09.%20Process%20Workers/04.%20invitation.md) - handles the invitation of new users
- [Mailing](/docs/developer/09.%20Process%20Workers/05.%20mailing.md) - handles the mail sending
- [NetworkRegistration](/docs/developer/09.%20Process%20Workers/06.%20network_registration.md) - handles the osp registration
- [OfferSubscription](/docs/developer/09.%20Process%20Workers/07.%20offer_subscription.md) - handles the subscription and automatic activation for an offer
- [UserProvisioning](/docs/developer/09.%20Process%20Workers/08.%20user_provisioning.md) - handles the cleanup of users

## Retriggering

The process has a logic to retrigger failing steps. For this a retrigger step is created which can be triggered via an api call to retrigger the step. This logic is implemented separately for each process. In general the retriggering of a step is possible if for example external services are not available. The retrigger logic for each process can be found in the process file.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
