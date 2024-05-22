# Run frontend locally

## Introduction

The portal frontend is divided into three parts

- Portal -> (/)
- Registration -> (/registration)
- Assets -> (/assets, /documentation)

![Schema of a local frontend environment](https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/frontend-localhost.svg)

Each of these is running as a separate web server process. In the final deployment the Kubernetes ingress controllers redirect requests to the according servers based on URL paths. To the client the application appears as one origin, so no CORS problems arise. To run the entire frontend on your local machine follow these steps.

## Set up a local development environment

We start each part as a server process running on a different port. Then we start a simple reverse proxy server at port 3000 that redirects client requests to the right server process, simulating the behavior of a Kubernetes ingress controller on localhost. Open three terminal sessions and enter the following commands

#### 1. Start the portal webserver instance on local port 3001

    git clone https://github.com/eclipse-tractusx/portal-frontend.git
    cd portal-frontend
    yarn
    yarn build
    yarn start

#### 2. Start the registration app webserver instance on local port 3002

    git clone https://github.com/eclipse-tractusx/portal-frontend-registration.git
    cd portal-frontend-registration
    yarn
    yarn build
    yarn start

#### 3. Start the reverse proxy and assets webserver instance on ports 3000 and 3003

    git clone https://github.com/eclipse-tractusx/portal-assets.git
    cd portal-assets
    yarn
    yarn build:release
    yarn build
    yarn start

With the last step the portal is fully running and there should automatically open
a browser session pointing to your local development instance at http://localhost:3000/

#### Connect to backend/interface instances

To connect your local portal frontend or registration app instance against a Portal Backend, Keycloak (centralidp), Business Partner Data Management, Semantic Hub and/or Managed Identity Wallet instance, change the default environment settings (example.org) in the [portal index.html](https://github.com/eclipse-tractusx/portal-frontend/blob/main/public/index.html), or [registration index.html](https://github.com/eclipse-tractusx/portal-frontend-registration/blob/main/public/index.html) respectively, on your local accordingly (do not commit those changes, it's recommended to keep them in a local stash).

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
