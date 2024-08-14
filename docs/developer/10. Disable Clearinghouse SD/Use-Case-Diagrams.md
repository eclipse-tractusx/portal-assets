# Disable Clearinghouse connectivity for Self-Description (SD) functionalities

## Registration

```mermaid
flowchart TD
    A[Registration]
    A --> D
    C[Legal Person SD Creation skipped]
    D[ToDo]
    E[Done]
    F[Failed]
    H{Clearinghouse Connect Disabled}
    I{Call SD Factory}
    D --> H
    H -->|True|C
    H -->|False|I
    I -->|Success|E
    I -->|Failure|F
    F -->|"Retrigger Call to SD Factory Processstep (legal person)"|D
    J[Await Self Description Response]
    E --> J
    K[Application Activation]
    J -->|set SD-DocumentId on Company| K
    C --> K
```

## Application Checklist Level

```mermaid
flowchart TD
    AA[Application Checklist Level]
    AE[REGISTRATION_VERIFICATION = DONE]
    AF[BUSINESS_PARTNER_NUMBER = DONE]
    AG[IDENTITY_WALLET = DONE]
    AGA[BPNL_CREDENTIAL = DONE]
    AGB[MEMBERSHIP_CREDENTIAL = DONE]
    AH[CLEARING_HOUSE = DONE]
    AI[SELF_DESCRIPTION_LP = TODO]
    AA --> AE
    AE --> AF
    AF --> AG
    AG --> AGA
    AGA --> AGB
    AGB --> AH
    AH --> AI
    AI --> AB
    AB{Clearinghouse Connect Disabled}
    AB -->|False| AJ
    AJ{Call SD Factory}
    AK["Self Description (Status FAILED)"]
    AD[APPROVED]
    AB -->|True|AC
    AJ -->|Success|AD
    AJ -->|Failure|AK
    AK -->|"Retrigger Call to SD Factory Processstep (legal person)"|AI
    AC["Self Description (Status SKIPPED)"]
    AL[APPLICATION_ACTIVATION = TODO]
    AL[APPLICATION_ACTIVATION = DONE]
    AC --> AL
    AD --> AL
```

## Connector Registration

```mermaid
flowchart TD
    BA[Connector Registration]
    BB{Clearinghouse Connect Disabled}
    BA --> BB
    BB -->|True|BE
    BB -->|False|BD
    BD{"Legal Person SD available (self_description_document_id)" }
    BE[Connector Registration]
    BF[Error 409]
    BD -->|True|BI
    BI[Call SD Factory]
    BI -->|Pending|BH
    BD -->|False|BF
    BE -->|Status Active| BH
    BH[Set Connector Status]
```

## Company SD Document Recreate

```mermaid
  flowchart TD
    CA[Company SD Document Recreate]
    CB["Select Company without SD (SD Step Status = SKIPPED or DONE)"]
    CA --> CB
    CC[Call SD Factory]
    CB -->|exists| CC
    CD[Store SD with Company]
    CE[DONE]
    CB -->|does not exist|CE
    CF{Company SD available}
    CC --> CF
    CF -->|Success|CD
    CD --> CB
    CG[FAILED]
    CF -->|Failure|CG
```

## Connector SD Document Recreate

```mermaid
  flowchart TD
    DA[Connector SD Document Recreate]
    DB["Select Connector(Status=Active & Without Connector SD Document & With Company SD Document)"]
    DA --> DB
    DC[Call SD Factory]
    DB -->|exists| DC
    DD[Store SD with Connector]
    DE[DONE]
    DB -->|does not exist|DE
    DF{Connector SD available}
    DC --> DF
    DF -->|Success|DD
    DD --> DB
    DG[FAILED]
    DF -->|Failure|DG
```

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
