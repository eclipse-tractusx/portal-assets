# Summary

The Page "App Overview" is accessible via the top main menu for app providers.

The main focus / scope of the page is to enable app providers to manage their apps under the release process, inside the marketplace or inactive apps, as well as starting the release process for a complete new app.

The page includes following functions

* search
* filter
* trigger app registration (link to be added)

<br>
<br>

# Function

<img width="573" alt="image" src="https://user-images.githubusercontent.com/94133633/211022275-11920588-0050-4034-af52-b0a869c0955b.png">

<br>
<br>

### Function: Register a new app
Via the "Register New App" button, the app provider can directly start the registration of a new app inside the network.

The card is used to get directed to the app release registration form:

<br>
<br>

### Function: "Active" App


<br>
<br>

### Function: "In Progress" App


<br>
<br>

### Function: "In Review" App


<br>
<br>

### Function: "Inactive" App


<br>
<br>
Additionally the "App Change Process" can get triggered from the app overview page. Details to the app change process are documented under following page App Marketplace - App Change Process
<br>
<br>

# Implementation

### #1 "Last Changed" Apps
Last changed apps is showing the 4 apps latest changed.
<br>
The function is only supported, if the company has more then minimum 6 apps. Otherwise this section does not exist.
<br>

```diff
! GET: /api/apps/provided
```
<br>

Details to the data mapping:

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211022578-320e2485-7dd0-4eca-b088-6656b4d4f0ec.png">

<br>
<br>

### #2 App Overview
The app overview displays all apps provided by the company to which the user belongs.


<br>

```diff
! GET: /api/apps/provided
```
<br>

Details to the data mapping:

<img width="500" alt="image" src="https://user-images.githubusercontent.com/94133633/211022690-4da9e5ae-0993-4f03-a897-404c26baa0e5.png">

<br>
<br>


