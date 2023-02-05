# Business Partner Data Management
<br>

## Interface Summary

BPDM Data Pool provides an API (Reference Data API) to lookup business partner data via REST endpoint "Lookup Business Partner". This endpoint provides access to several external data sources (trade registers, open data repositories, etc.)
<br>
API authentication is managed by API keys which is processed via HTTP header. This key manages also authorization, e.g., access to the CX data pool (instead of other community data).
<br>
<br>
For the registration process we are using the BPDM data call to pull the company basic data.
<br>
2 Options are available for the data pull
<br>
* Via Company Name (Level 2 - not yet implemented)
* Via BPN Number (BPN Generator: BPN Generator: Modes of Operation)
<br>
<br>

## Architecture Overview
To integrate the API into CX onboarding process, portal team just have to call the lookup REST endpoint and transform the response into a pick list for the portal user.
<br>
<img width="927" alt="image" src="https://user-images.githubusercontent.com/94133633/210436463-cdf5e063-b37c-4f28-b9c0-a78af52aaee4.png">
<br>
<br>

## Description of the functional interface (WHAT)
Retrieving company data from the CX mirror.
<br>
<br>

## Description of the physical interfaces (HOW)
<br>
<img width="1200" alt="image" src="https://user-images.githubusercontent.com/94133633/210436060-929f9d50-0af3-47c7-aabd-16526f4dd7af.png">
<br>
<br>

### Service Call via BPN
<br>

```diff
! GET /api/catena/business-partner/{idValue}
```

<br>
  idValue: {BPN-Number},
  idType: BPN
<br>
<br>

#### Data Mapping for Company Data
<br>

|Data Field Name Portal|Data Field on CX Data Pool|Example|
|--------|--------|--------|
|BPN|"bpn": (first response line)|BPNL0MVP000000Q7|
|Organization Name|"names": [ { "value}]|German Car Factory|
|Registered Name |"names": [ { "value}]|German Car Factory|
|International Name |"names": [ { "value}]|German Car Factory|
|Street & House Number|addresses "country": [ { "technicalKey":}]|DE|
|Country|addresses "postCodes": [ { "value":}]|80809|
|Postal Code|addresses "localities": [ { "value":}]|Munich|

<br>
<br>

### Service Call via CompanyName
<br>
currently not supported
<br>
<br>


