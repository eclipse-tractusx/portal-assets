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
- [portal-iam](https://github.com/eclipse-tractusx/portal-iam)

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

### Changes compared to last Security Assessment

* No major architectural changes that introduce new threats.
* Main changes are connections to the onboarding service provider.

### Features for Upcomming Versions

* Integration of onboarding service provider endpoints.

## Threats & Risks

All threats identified are mitigated.
