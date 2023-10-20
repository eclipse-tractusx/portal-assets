# Run frontend locally

## Introduction

The portal frontend is divided into three parts

- Portal -> (/)
- Registration -> (/registration)
- Assets -> (/assets, /documentation)

![Schema of a local frontend environment](https://raw.githubusercontent.com/catenax-ng/tx-portal-assets/main/public/assets/images/docs/frontend-localhost.svg)

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
By default the frontend is using the backend services deployed on the public development environment.
