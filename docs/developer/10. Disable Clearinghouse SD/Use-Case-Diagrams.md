# Disable Clearinghouse connectivity for Self-Description (SD) functionalities

## Application Checklist Level

```mermaid
flowchart TD
    AA[Application Checklist Level]
    AB{"clearinghouseConnectDisabled"}
    AC["SELF_DESCRIPTION_LP = SKIPPED"]
    AD{"Await Self Description Response"}
    AE[REGISTRATION_VERIFICATION = DONE]
    AF[BUSINESS_PARTNER_NUMBER = DONE]
    AG[IDENTITY_WALLET = DONE]
    AGA[BPNL_CREDENTIAL = DONE]
    AGB[MEMBERSHIP_CREDENTIAL = DONE]
    AH[CLEARING_HOUSE = DONE]
    AI[SELF_DESCRIPTION_LP = TODO]
    AJ["Call SD Factory"]
    AK["SELF_DESCRIPTION_LP = FAILED"]
    AL[APPLICATION_ACTIVATION = TODO]
    AM[APPLICATION_ACTIVATION = DONE]
    
    AA --> AE
    AE --> AF
    AF --> AG
    AG --> AGA
    AGA --> AGB
    AGB --> AH
    AH --> AI
    AI --> AB   
    AB -->|FALSE| AJ   
    AB -->|TRUE|AC
    AJ --> AD
    AD -->|FAILURE|AK
    AK -->|"Retrigger Call to SD Factory Processstep (legal person)"|AI    
    AC --> AL
    AD --> |APPROVED| AL
    AL --> AM
```

## Create Connector

```mermaid
flowchart TD
    BA[Create Connector]
    BB{"clearinghouseConnectDisabled"}
    BD{"Legal Person SD available (self_description_document_id)" }
    BF["Error 409: provider company {CompanyId} has no self description document"]
    BI[Call SD Factory]    
    BK["Create connector (STATUS = PENDING)"]
    BL["Await Self Description Response"]
    BM["Store SD with connector"]
    BN[Set connector STATUS = ACTIVE]

    BA --> BB
    BB -->|TRUE|BN
    BB -->|FALSE|BD   
    BD -->|TRUE|BK
    BK --> BI
    BI --> BL
    BD -->|FALSE|BF       
    BL --> BM
    BM --> BN
```

## Trigger - Create Company SD Document

```mermaid
  flowchart TD
    CA[Company SD Document Retrigger]
    CB["Select Company without SD (SD Step Status = SKIPPED or DONE)"]
    CC[Call SD Factory]
    CD[Store SD with Company]
    CE[SELF_DESCRIPTION_COMPANY_CREATION = DONE]
    CF{Company SD available}
    CG[SELF_DESCRIPTION_COMPANY_CREATION =FAILED]
    CH[SELF_DESCRIPTION_COMPANY_CREATION = DONE]
    CA --> CB    
    CB -->|Company does exist| CC       
    CB -->|Company does not exist|CH
    CC --> CF
    CF -->|SUCCESS|CE  
    CF -->|FAILURE|CG    
    CE --> CD
     
```

## Trigger - Create Connector SD Document

```mermaid
  flowchart TD
    DA[Connector SD Document Recreate]
    DB["Select Connector(Status=Active & Without Connector SD Document & With Company SD Document)"]
    DC[Call SD Factory]
    DD[Store SD with Connector]
    DE[SELF_DESCRIPTION_COMPANY_CREATION = DONE]
    DF{Connector SD available}
    DG[SELF_DESCRIPTION_COMPANY_CREATION = FAILED]
    DH[SELF_DESCRIPTION_COMPANY_CREATION = DONE]
    DA --> DB   
    DB -->|Connector does exist| DC   
    DB -->|Connector does not exist|DH   
    DC --> DF
    DF -->|SUCCESS|DE
    DE --> DD
    DF -->|FAILURE|DG
```

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets