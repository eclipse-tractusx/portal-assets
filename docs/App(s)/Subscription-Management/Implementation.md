# Summary

The Page "App Subscription Management" is accessible via the top main menu for app providers.

The main focus / scope of the page is to enable app providers to manage their app subscriptions (active as well as requests)

The page includes following functions

* search
* filter
* trigger subscription activation

<br>
<br>

Links:  

[Design](/docs/App(s)/Subscription-Management/Design.md)  
[FAQ](/docs/App(s)/Subscription-Management/FAQ.md)

<br>
<br>

# Implementation

### #1 View Subscriptions
The endpont shows all subscription requests and active subscriptions.  
<br>

Data mapping details:  
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/94133633/211656936-ce3cfc99-9632-453b-bfcd-19bf8ba60edc.png">

<br>

```diff
! GET: /api/Apps/provided
```
<br>

<br>
<br>

### #2 Subscription Activation
The app subscription activation is used to activate the customer app tenant. The endpoint can only get triggered if the app subscription is in sttaus "PENDING".  
By entering the tenant url, the client is getting registered inside the portal db and the catena-x idp.  
<br>

```diff
! POST: /api/apps/autoSetup
```

<br>
<br>
