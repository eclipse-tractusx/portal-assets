# Managed Wallets
<br>

## Interface Summary

Wallets are <strong>the touchpoint of company/participant to SSI as the digital identity</strong>. Companies can interact with other actors in the network using their own identity on their wallet.
Since SSI Wallets are not yet common on company level, Catena-X decided to create CX managed wallets for membership companies. This wallets can be used to enable the benefits of SSI for a number of services.
<br>
The Portal / Managed Service connection is implemented in 2 functions
* Company Registration - initital wallet creation
* EDC Registration - EDC Self-Description creation
<br>
<br>

## Architecture Overview
<br>
### #1 Company Registration
<br>
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/94133633/210450411-03a7c623-464c-4246-bdc9-460b98952af4.png">
<br>
<br>

### #2 Company Registration
<br>
<img width="1100" alt="image" src="https://user-images.githubusercontent.com/94133633/210450520-c385800f-b05c-41b2-a301-7fa305ae79b0.png">
<br>
<br>

## Authentication Flow / Details
<br>
<br>
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/94133633/210450632-ec394df5-ed4c-4f11-b4ea-9ba10bd134f1.png">
<br>
<br>

## Description of the functional interface (WHAT)
Creation of a managed wallet for the newly registered legal person / company.
<br>
<br>

## Description of the physical interfaces (HOW)
With the /approvalRequest api, the managed wallet logic is triggered to create for the new member (based on the bpn) a new managed wallet.
<br>
<br>

## APIs
<br>
Endpoint: no specific endpoint, part of the portal internal logic, which will call the /selfdescription factory endpoint

