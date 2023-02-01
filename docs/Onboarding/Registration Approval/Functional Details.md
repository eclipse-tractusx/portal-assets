# Functional Details

<img width="1030" alt="image" src="https://user-images.githubusercontent.com/94133633/210288536-91900625-b007-4323-b756-77d81d562176.png">
<br>
<br>

### Display Application Details
<br>
With using the application details button, application details such as
<br>
<br>

 * Company Data
 * Company application role
 * Documents, and
 * details to the approval flow status

<br>
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/94133633/210288576-e97207fe-fb86-44ed-991a-f6c9de7b47c8.png">

<br>
<br>

### Approval Flow
<br>
The company registration approval flow is covering the manual and automatic check of the company application including the setup of the company to participate inside the dataspace.
<br>
The list below shows an overview of all application approval steps:

<br>
<br>
<p align="center">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/94133633/216109363-bbfa5758-73b6-4b2a-9588-fc8832eeadf4.png">
</pr>
<br>
<br>

As highlevel displayed above; the registration approval flow consist out of 6 steps. Which can parcially run in parallel or must run in the predefined sequence.
The six registration approval flow steps are implemented in a kind of an checklist worker which automatically triggers the relevant services as per the current state of the company application. To ensure that the operator knows the status of the company application, each step can be in the status

 * Open
 * In Progress
 * Done
 * Failed

In case of an failed scenario; the error code (if available) is getting recorded for the registration application workflow step and can get viewed by the operator.
<br>
<br>

##### Details "Manual Validation"
<br>
The "manual validation" checklist item is covering the company application validation by the operator. In this step the application gets manually checked and 'approved' or 'declined'.
Depending on the decision the checklist item "Registration_Verification" is set to DONE or FAILED.

In the scenario of FAILED, a comment/message can get submitted by the operator and provided/send via email to the company application party.
<br>
<br>

###### Scenario: Approve

The endpoint "approve" sets the "Registration_Verification" checklist item to "DONE". 
The endpoint can only get triggered/executed if the application is in status "submitted" and the "Registration_Verification" in Status "TO_DO"
<br>

```diff
! PUT /api/administration/registration/application/{applicationId}/approve
```

<br>

###### Scenario: Decline

The endpoint "decline" sets the "Registration_Verification" checklist item to "FAILED" incl. a time stamp, as well as the decline message added by the operator. 
The endpoint can only get triggered/executed if the application is in status "submitted" and the "Registration_Verification" in Status "TO_DO".
<br>

```diff
! PUT /api/administration/registration/application/{applicationId}/decline
```

Request Body:

    {
      "comment": "string"
    }

<br>
<br>

###### Details "Create Business Partner Number (if necessary)"
<br>

<br>
<br>

###### Details "Create Managed Identity Wallet"
<br>

<br>
<br>

###### Details "Clearinghouse Check"
<br>

<br>
<br>

###### Details "Self-Description Creation LegalPerson"
<br>

<br>
<br>

###### Details "Activation"
<br>



<br>
<br>

### Add/Update BPN for the registration company
<br>
The bpn can get manually added (as an workaround) if the registration company request doesnt have a business partner number added and the registration request is in status "submitted".
<br>
<img width="1213" alt="image" src="https://user-images.githubusercontent.com/94133633/210288619-5b526c86-25b2-4be7-a73c-da07ce3a0214.png">
<br>
BPNs can only get added by CX Admin's.
As mentioned above, the implementation is a workaround only and will get replaced by the actual bpn connection as soon as the reference implementation is available.
<br>
