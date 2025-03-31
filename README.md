[![LeadingRepository](https://img.shields.io/badge/Leading_Repository-Portal-blue)](https://github.com/eclipse-tractusx/portal)

# Portal Assets

Test push to Dockerhub

This repository contains the documentation and static image content for Portal.

The Portal application consists of

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

The helm chart for installing the Portal is available in the [portal](https://github.com/eclipse-tractusx/portal) repository.

Please refer to the [docs](./docs/) directory for the overarching documentation of the Portal application.

The Portal is designed to work with the [IAM](https://github.com/eclipse-tractusx/portal-iam).

## Local build and run

1. Install dependencies

```
yarn
```

3. Build release for documentation app

```
yarn build:release
```

3. Build

```
yarn build
```

4. Run

```
yarn start
```

This will start the assets and documentation on

- https://localhost:3003/assets/
- https://localhost:3003/documentation/

Note: if you'd like to run the complete frontend application, follow the `Run frontend on localhost.md` guide within the developer documentation which is available within this repository.

## Notice for Docker image

This application provides container images for demonstration purposes.

See [Docker notice](.conf/notice-assets.md) for more information.

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
