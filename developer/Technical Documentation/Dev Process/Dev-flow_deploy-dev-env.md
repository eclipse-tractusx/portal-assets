# Dev flow with deployment to dev environment

```mermaid
flowchart LR
    subgraph local
    D(Developer)
    end
    subgraph eclipse-tractusx or fork
        direction LR
        subgraph CI repos
            D -- PR to dev* --> PF(portal-frontend**)
            D -- PR to dev* --> PR(portal-registration**)
            D -- PR* to main --> PA(portal-assets**)
            D -- PR* to dev--> PB(portal-backend***)
            click PF "https://github.com/eclipse-tractusx/portal-frontend"
            click PR "https://github.com/eclipse-tractusx/portal-frontend-registration"
            click PA "https://github.com/eclipse-tractusx/portal-assets"
            click PB "https://github.com/eclipse-tractusx/portal-backend"
        end
        subgraph CI+CD repo
            direction TB
            D -- PR* to main for !=charts --> PI(portal-iam****)
            D -- PR* to -b helm-environments for charts --> PI
            PI --> PICD(portal-iam -b helm-environments)
            click PI "https://github.com/eclipse-tractusx/portal-iam"
        end
        subgraph CD repo for auto-deploy to dev
            direction LR
            PF --> CD(portal-cd***** -b helm-environments)
            PR --> CD
            PB --> CD
            PA --> CD
            D -- PR* to -b helm-environments for chart --> CD
            click CD "https://github.com/eclipse-tractusx/portal-cd"
        end
    end
    subgraph Argo CD - sync to k8s cluster
    CD -- auto-sync --> A(Argo CD dev)
    PICD --> A
    click A "https://argo.dev.demo.catena-x.net"
    end
```

Note* Every pull request (PR) requires at least one approving review by a peer

Note** ESlint, unit tests and Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily and Veracode scan runs weekly

Note*** Unit tests and Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily and Veracode scan runs weekly

Note**** Sonarcloud runs at pull request, Trivy and KICS scans at merge as well as daily

Note***** Trivy and KICS scans are scheduled to daily
