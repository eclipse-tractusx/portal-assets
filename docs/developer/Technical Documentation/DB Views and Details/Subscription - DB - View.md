## Subscription

### Subscription DB Connection

<img width="612" alt="image" src="https://user-images.githubusercontent.com/94133633/211090678-e3d559fb-d6a5-466c-917b-840329a3d3de.png">

<br>
<br>

#### Difference Offer_Subscription and App_Subscription_Details

The offer_subscription table is holding all subscription requests; active subscriptions as well as inactive subscriptions.
When a user is triggering the subscription request for anything on the marketplace; the request/record will get saved inside the offer_subscription table.  
<br>
The app_subscription_details table is only used when an app subscription request is getting activated. In that case; the app subscription details (such as the tenant url) is getting stored inside this table.
Endpoints such as "My Business Application" are using those details to provide the right tenant/url to the respective user.

<br>
<br>

#### Display Name

Currently not used but will be needed in future as preparation for multi tenant subscription/purchasing.
Planned release 3.2

<br>
<br>

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
