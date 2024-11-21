# Developing Shared Components

## Introduction

The portal shared components are a set of React UI components created for the general use in Catena-X applications.
Most components are based on Material UI and are styled to match the Catena-X look-and-feel.

Find more information here:

- Source code: https://github.com/eclipse-tractusx/portal-shared-components.git
- NPM library: https://www.npmjs.com/package/@catena-x/portal-shared-components
- Storybook: https://eclipse-tractusx.github.io/portal-shared-components/

## Developing Shared Components

While developing shared components we suggest you create your own namespace on npmjs.com and publish your private copy
of the library until you think the changes are ready for a PR. Follow these steps:

One time:

1. create an account on npmjs.com (ideally same as your github name if not taken).
2. after logging in open the user menu and select "Access tokens" -> "Generate new token" -> "Classic token" -> select "Automate". Make sure you save that token somewhere. Best is to create an environment variable export NPM\*TOKEN=npm**\*\***
3. run npm adduser -> log in to confirm

Every time you make a change:

1. locally change the name of the library in package.json from @catena-x/portal-shared-components to @<your_name>/portal-shared-components (or any other available name)
2. run yarn && yarn build && npm publish (the last command only works if you have the environment variable set like step 2. above is suggesting. Otherwise set it in front of the command like this NPM*TOKEN=npm*\*\*\*\* npm publish
3. (optional) check on npmjs.com if your package has been published
4. in portal-frontend/ change the name of the import package.json to the name you gave in 3.
5. test the changes from your own copy of the library on the portal-frontend locally.
6. if everything works as expected do this:
   - run npm unpublish --force
   - change the names back to @catena-x , set the version to one higher than the last published one and raise PR.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
