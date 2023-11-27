# Security Assessment Portal (incl. Frontend, Backend Services, IAM and other infrastructure)

|     |     |
| --- | --- |
| Contact for product        | [@evegufy](https://github.com/evegufy) <br> [@jjeroch](https://github.com/jjeroch) |
| Security responsible       | [@SSIRKC](https://github.com/SSIRKC) <br> [Szymon Kowalczyk](szymon.kowalczyk.external@zf.com) |
| Version number of product  | 23.12 |
| Dates of assessment        | 2023-11-14: Re-Assessment |
| Status of assessment       | RE-ASSESSMENT DRAFT |

## Product Description

The Catena-X Portal and Marketplace is the heart of Catena-X and the entry point for all activities in the automotive network/value chain.
Every user of the automotive value chain, no matter if it is a consumer, app provider, IT administrator or IT support will connect via the portal to the value bringing services.
The whole eco-system on the automotive value chain is connected at one place.
* Portal Frame
* Partner Onboarding Process (initial, technical & business)
* Login Process
* User Management
* App Store
* Developer Platform
* UI / UX & Developer Guidelines

### Important Links

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend)
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration)
- [portal-shared-components](https://github.com/eclipse-tractusx/portal-shared-components)
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets)
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend)


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

### Changes compared to last Security Assessment

* No major architectural changes that introduce new threats.
* Main changes are connections to the onboarding service provider.

### Features for Upcomming Versions

* Integration of onboarding service provider endpoints.

## Threats & Risks

All threats identified are mitigated.
