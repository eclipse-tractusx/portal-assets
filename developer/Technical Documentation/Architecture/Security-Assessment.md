# Security Assessment

## Data Flow Diagram

```mermaid
flowchart LR

    RF("Registration")
    PF("Portal")

    RS(Registration service)
    AS(Administration service)
    MAS(Marketplace apps service)
    MSS(Marketplace services service)
    NS(Notification service)

    NC("Potential new company (admin)")
    CU-Shared(Company user)
    CU-Own(Company user)

    K("Keycloak (REST API)")

    BPDM(Business Partner Data Management)
    SDT(Semantic Hub / Digital Twin)
    SDR("SD-Registry \n (Self Description)")
    MIW(Managed Identity Wallets)

    CH(Gaia-X Clearing House)

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
    subgraph Keycloak
      subgraph centralidp
      K
      end
      subgraph sharedidp
        subgraph Company realms
        NC
        CU-Shared
        end
      end
    end
    subgraph ownIdP
    CU-Own
    end
    subgraph cross[Catena-X Cross functions]
    BPDM
    SDT
    SDR
    MIW
    end
    subgraph ext["External Services (3rd party)"]
    CH
    end
  
    RS <-->|Company data \n user role data \n T&C / consent agreements| RF
    RS <--> K
    RS -->|Company data \n user role data \n T&C consent agreements| PDB
    RS -->|"Company data (e.g. name, etc.)"| BPDM

    AS --> K
    AS <--> PF
    AS -->|"User data \n (real and technical company data)"| PDB
    AS -->|Data related to \n self description| SDR
    AS -->|"Create MIW-tenant \n update MIW-tenant (BPN-VC, Member-VC) \n update MIW-framework-VC \n update dismantler-VC \n data: BPN, Auth, Contract, Version"| MIW
    AS -->|Company data \n signed self description| CH

    MAS -->|Company app subscription data \n app service data + user preferences| PDB
    MAS <--> K & PF

    MSS <--> PF & K
    MSS -->|Company app subscription data \n app service data + user preferences| PDB

    NS --> PDB & PF & K

    PF -->|Product meta data| SDT
    PF -->|"Company data (e.g. BPN)"| BPDM

    NC & CU-Shared & CU-Own --> |OIDC| K

    K <--> |"Authentication/authorization data (using JWT)"| RF & PF

    %% workaround to improve arrangement of subgraphs
    K ~~~ ownIdP & cross & ext
```
