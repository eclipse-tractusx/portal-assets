# Dev flow with deployment to dev environment

```mermaid
flowchart LR
    subgraph local
    D(Developer)
    end
    subgraph eclipse-tractusx
        direction LR
        subgraph CI repos
            D -- PR to dev* --> PF(portal-frontend**)
            D -- PR to dev* --> PR(portal-registration**)
            D -- PR* to main* --> PA(portal-assets**)
            D -- PR* to dev*--> PB(portal-backend***)
            click PF "https://github.com/eclipse-tractusx/portal-frontend"
            click PR "https://github.com/eclipse-tractusx/portal-frontend-registration"
            click PA "https://github.com/eclipse-tractusx/portal-assets"
            click PB "https://github.com/eclipse-tractusx/portal-backend"
        end
        subgraph CI+CD repo
            direction TB
            D -- PR* to main* --> PI(portal-iam****)
            PI --> PICD(portal-iam -b main)
            click PI "https://github.com/eclipse-tractusx/portal-iam"
        end
        subgraph CD repo for auto-deploy to dev
            direction LR
            PF --> CD(portal-cd***** -b dev)
            PR --> CD
            PB --> CD
            PA --> CD
            D -- PR* to -b dev for chart --> CD
            click CD "https://github.com/eclipse-tractusx/portal-cd"
        end
    end
    subgraph Argo CD - sync to k8s cluster
    CD -- auto-sync --> A(Argo CD dev)
    PICD --> A
    click A "https://argo.dev.demo.catena-x.net"
    end
```

Note\* Every pull request (PR) requires at least one approving review by a committer

Note\*\* ESlint, unit tests and Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily and Veracode scan runs weekly

Note\*\*\* Unit tests and Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily and Veracode scan runs weekly

Note\*\*\*\* Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily

Note**\*** Trivy and KICS scans are scheduled to daily

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
