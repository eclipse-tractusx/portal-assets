# Data Flow Diagram

```mermaid
flowchart LR

    RF("Registration")
    PF("Portal")

    RS(Registration service)
    AS(Administration service)
    MAS(Marketplace apps service)
    MSS(Marketplace services service)
    NS(Notification service)

    CU-Own(Company user)

    NC1("Potential new company (admin)")
    CU-Shared1(Company user)

    NC2("Potential new company (admin)")
    CU-Shared2(Company user)

    NC3("Potential new company (admin)")
    CU-Shared3(Company user)

    K("Keycloak (REST API)")

    BPDM(Business Partner Data Management)
    SDT(Semantic Hub)
    SDF("SD Factory \n (Self Description)")
    MIW(Managed Identity Wallets)

    CH(Gaia-X Clearing House)
    OSP("Onboarding Service Provider \n (Owns infrastructure \n e.g. IAM, portal and registration app, \n other core services) ")

    subgraph Portal
        subgraph Frontend
        RF
        PF
        end
        subgraph Backend
        RS
        AS
        MAS
        MSS
        NS
        end
    PDB[(Portal DB \n Postgres \n EF Core for mapping \n objects to SQL)]
    end
    subgraph operator[Operator IdP]
      subgraph centralidp[centralidp Keycloak]
      K
      end
      subgraph sharedidp[sharedidp Keycloak]
        subgraph companyrealm1[Company realm]
        NC1
        CU-Shared1
        end
        subgraph companyrealm2[Company realm]
        NC2
        CU-Shared2
        end
        subgraph companyrealm3[Company realm]
        NC3
        CU-Shared3
        end
      end
    end
    subgraph ownIdP
    CU-Own
    end
    subgraph cross[Catena-X Cross functions]
    BPDM
    SDT
    SDF
    MIW
    OSP
    end
    subgraph ext["External Services (3rd party)"]
    CH
    end

    RS <-->|Company data \n user role data \n T&C / consent agreements| RF
    RS <--> K
    RS -->|Company data \n user role data \n T&C consent agreements| PDB

    AS --> K
    AS <--> PF
    AS -->|"User data \n (real and technical company data)"| PDB
    AS ---|Data related to \n self description| SDF
    AS -->|"Create MIW-tenant \n update MIW-tenant (BPN-VC, Member-VC) \n update MIW-framework-VC \n update dismantler-VC \n data: BPN, Auth, Contract, Version"| MIW
    AS <-->|Company data \n signed self description| CH
    AS <-->|OSP registers its customer \n Company Data \n Admin User Record| OSP

    NS --> PDB & PF & K

    BPDM -->|"Company data (e.g. name, etc.)"| RF
    BPDM -->|"Company data (e.g. BPN)"| AS

    MAS -->|Company app subscription data \n app service data + user preferences| PDB
    MAS <--> K & PF

    MSS <--> PF & K
    MSS -->|Company app subscription data \n app service data + user preferences| PDB

    SDF <--> CH

    SDT -->|Product meta data| PF

    NC1 & CU-Shared1 & NC2 & CU-Shared2 & NC3 & CU-Shared3 & CU-Own --> |OIDC| K

    K <--> |"Authentication/authorization data (using JWT)"| RF & PF
```

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
