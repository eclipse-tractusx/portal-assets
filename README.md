# Catena-X Portal Assets

This repository contains the documentation and static image content for Catena-X Portal.

The Catena-X Portal application consists of

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat) The helm chart for installing the Catena-X Portal is available in [portal-cd](https://github.com/eclipse-tractusx/portal-cd).

The Catena-X Portal is designed to work with the [Catena-X IAM](https://github.com/eclipse-tractusx/portal-iam) for further information you can read the [documentation](https://github.com/eclipse-tractusx/portal-iam/tree/main/docs).

## Steps to run local

    yarn
    yarn build:release
    yarn build
    yarn start

This will start the assets and documentation on

- https://localhost:3003/assets/
- https://localhost:3003/documentation/

Note: if you'd like to run the complete frontend application, follow the 'Run frontend on localhost' guide within the developer documentation which is available within this repository.

## Notice for Docker image

This application provides container images for demonstration purposes.

DockerHub: https://hub.docker.com/r/tractusx/portal-assets

Base image: nginxinc/nginx-unprivileged:alpine

- Dockerfile: [nginxinc/nginx-unprivileged:alpine](https://github.com/nginxinc/docker-nginx-unprivileged/blob/main/Dockerfile-alpine.template)
- GitHub project: [https://github.com/nginxinc/docker-nginx-unprivileged](https://github.com/nginxinc/docker-nginx-unprivileged)
- DockerHub: [https://hub.docker.com/r/nginxinc/nginx-unprivileged](https://hub.docker.com/r/nginxinc/nginx-unprivileged)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
