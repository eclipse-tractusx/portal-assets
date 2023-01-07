# Summary

Service purchasing is describing the subscribe/purchase process of an service inside the catena-x service marketplace.

<br>
<br>

# Functionality

<img width="1471" alt="image" src="https://user-images.githubusercontent.com/94133633/211170242-a9e40b4c-b500-495b-a293-0774908c0dca.png">

<br>
<br>

# Implementation

### #1 Get Service Offers

Get Service offers can get viewed / displayed by all users of the network. Its used to display the available services in status "ACTIVE" inside the marketplace.

<br>

Data mapping logic:

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211170286-cbcc11f7-d6b0-45e7-a3eb-b88974032cb1.png">

<br>

```diff
! GET /api/services/active
```

<br>
<br>

### #2 Get Service Offer Details

When selecting an offered service, the service details are getting fetched.

Data mapping logic:

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211170341-97904369-250c-416e-b9fe-b34f549d69d3.png">

<br>

```diff
! PUT Get /api/services/{serviceID}
```

<br>
<br>

### #3 Get Service Order Details

When the user is accessing a service detail page and in case there are already active or pending subscriptions, the subscription status will show up below the "Subscribe" button.  
Details regarding active subscriptions will be included in the get service details endpoint.
<br>

```diff
! PUT Get /api/services/{serviceID}
```

<br>
Details on the UI implementation

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211170389-1cbba688-7ac8-49ff-8c11-59d06d44a1c0.png">

<br>
<br>
