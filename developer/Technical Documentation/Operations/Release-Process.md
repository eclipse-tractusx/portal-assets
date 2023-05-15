# Release Process

The release process for a new version can roughly be divided into the following steps:

* [Preparations on the release branch](#preparations-on-the-release-branch)
* [Tag and build of versioned images](#tag-and-build-of-versioned-images)
* [Merge release branch](#merge-release-branch)
* [Release new helm chart version](#release-new-helm-chart-version)
* [Create releases from tags](#create-releases-from-tags)
* [Publish new version of Shared UI Components to npm](#publish-new-version-of-shared-ui-components-to-npm)

The process builds on the development flow which, usually, takes place within forks and leads to merged pull pull requests in the repositories of the eclipse-tractusx organization.

Frontend repositories:

* <https://github.com/eclipse-tractusx/portal-frontend>
* <https://github.com/eclipse-tractusx/portal-frontend-registration>
* <https://github.com/eclipse-tractusx/portal-assets>

Backend repository:

* <https://github.com/eclipse-tractusx/portal-backend>

Continuous Deployment / CD repository (containing the portal helm chart)

* <https://github.com/eclipse-tractusx/portal-cd>

For assigning and incrementing **version** numbers [Semantic Versioning](https://semver.org) is followed.

## Preparations on the release branch

Checking out from the dev branch (or main for portal-assets) a release branch (release/{to be released version} e.g. release/1.2.0) is created.
On the release branch the following steps are executed:

### 1. Version bump

For the frontend repos, the version in the 'package.json' files needs to get bumped, the following statement can be used:

```bash
yarn version
```

For the backend repo, the version needs to be updated within the 'Directory.Build.props' file.

Example for commit message:

*release: bump version for vx.x.x*

### 2. Update changelog file

The changelog file tracks all notable changes since the last released version.
During development every developer should extend the changelog under the 'Unreleased' section when raising a pull request to main or dev.
Once a new version is ready to be released, the changelog of the version gets finalized and the release version gets set for the, up to then, unreleased changes.
In the released version, the changelog is structured as following:

* Changes
* Features
* Technical Support
* Bug Fixes

In case of breaking change, the breaking change will get highlighted with a breaking change tag => ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)

Example for commit message:

*release: update changelog for vx.x.x*

### 3. Update dependencies file

Make sure that the [version bump](#1-version-bump) happened beforehand (relevant for [portal-frontend](https://github.com/catenax-ng/tx-portal-frontend) repo, using the shared-components).
In order to have an up-to-date list, of the used third-party libraries, the dependencies file needs to be updated.

For the frontend repositories this can be done by running the following statement:

```bash
yarn licenses list > DEPENDENCIES
```

For the backend repository the dependencies file can be updated by running the following statements:

```bash
dotnet list src package --include-transitive > DEPENDENCIES-PREP
cat DEPENDENCIES-PREP | grep ">" | grep -Pv "\s(Org|Microsoft|NuGet|System|runtime|docker|Docker|NETStandard)" | sed -E -e "s/\s+> ([a-zA-Z\.\-]+).+\s([0-9]+\.[0-9]+\.[0-9]+)\s*/nuget\/nuget\/\-\/\1\/\2/g" > DEPENDENCIES
awk -i inplace '!seen[$0]++' DEPENDENCIES
```

Only commit the updated dependencies file, not the 'DEPENDENCIES-PREP' file.

Example for commit message:

*release: update dependencies file for vx.x.x*

### 4. License check with the Eclipse Dash License Tool

Before releasing, make sure that the new or updated 3rd party libraries are license-vetted, by using the [Eclipse Dash License Tool](https://github.com/eclipse/dash-licenses).
This is to be considered an additional and final check as licenses are vetted already at PR stage.

For the frontend repos, the yarn.lock file needs to be checked by the tool:

```bash
java -jar org.eclipse.dash.licenses-xxx.jar yarn.lock -project automotive.tractusx
```

For the backend repo, the DEPENDENCIES file needs to be checked by the tool:

```bash
java -jar org.eclipse.dash.licenses-xxx.jar DEPENDENCIES -project automotive.tractusx
```

If the tool identifies libraries that require further review, pre-vet the libraries regarding license compatibility and availability of sources. If the check is successful, create [IP Team Review Requests](https://github.com/eclipse/dash-licenses#automatic-ip-team-review-requests).

### 5. Aggregate migrations (backend repo only)

Migrations should be **aggregated in the case of releasing a new version**, in order to not release the entire history of migrations which accumulate during the development process.

Once a version has been released, migrations **mustn't be aggregated** in order to ensure upgradeability this also applies to **release candidates > RC1 and hotfixes**.
Be aware that migrations coming release branches for release candidates or from hotfix branches, will **need to be incorporated into dev and main**.

## Tag and build of versioned images

It's important to pull the latest state of the release branch locally in every repository.
Then create and push a tag for the released version.
The push of the tag triggers the release workflow action (available in every repository) which creates the versioned image/s.

Example for tag:

*v1.2.0*

Examples for tag messages:

*Version 1.2.0: Frontend Portal for the Catena-X*

*Version 1.2.0: Frontend Registration for the Catena-X*

*Version 1.1.0: Assets for the Catena-X Portal*

*Version 1.1.0: Backend for the Catena-X Portal*

## Merge release branch

Once the release tag has been pushed, the release branch should be is merged into main.
Afterwards, main into dev. This is only necessary for repositories with a dev branch.
Those merges need to happen via PRs.

Example for PR titles:

*release(1.2.0): merge release into main*

*release(1.2.0): merge main to dev*

## Release new helm chart version

Once the versioned images are available, a new version of the chart can be released.
The helm chart is released from <https://github.com/eclipse-tractusx/portal-cd>.

Check out a release branch from 'dev'.
On the release branch the following steps are executed:

1. Bump chart and image version (also for argocd-app-templates, needed for consortia-environments)

2. Update changelog file

3. Update README (chart and root level)

Use [helm-docs](https://github.com/norwoodj/helm-docs) (gotemplate driven) for updating the README file.

```bash
helm-docs --chart-search-root [charts-dir] --sort-values-order file
```

Copy updated README file on chart level to root level.

Example for commit message:

*release: update readme for vx.x.x*

Once the steps are done, create a PR to 'main' to test the to be released helm chart with the 'Portal Lint and Test Chart' workflow.

Example for PR title:

*release(1.2.0): merge release into dev*

Once the workflow ran successfully, release the new helm chart by running the 'Release Chart' action via workflow dispatch on the release branch.

Then merge the release branch into 'main' and merge afterwards 'main' in 'dev'.

At the release of the chart, besides the official chart itself, there is also created a 'portal-x.x.x' tag.
This tag is used to install (with the convenience of the argocd-app-templates) or upgrade the version via AgroCD on the consortia K8s clusters.

## Create releases from tags

Technically this step is already possible after [Tag and build of versioned images](#tag-and-build-of-versioned-images), but it's a recommendation to create the releases from the tags in the frontend and backend repositories only once the new helm chart version has been tested and released.

Examples for release messages:

*Version 1.2.0: Frontend Portal for the Catena-X*

*Version 1.2.0: Frontend Registration for the Catena-X*

*Version 1.1.0: Assets for the Catena-X Portal*

*Version 1.1.0: Backend for the Catena-X Portal*

## Publish new version of Shared UI Components to npm

Make sure that you have a [npm-account](https://www.npmjs.com/login) and login:

```bash
npm login
```

Also, you must have been invited to collaborate on the [Shared UI Components](https://www.npmjs.com/package/cx-portal-shared-components).

Checkout the new version from tag in the [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend) repo
:
```bash
git checkout tags/v1.2.0 -b npm/v1.2.0
```

Execute the following commands:

```bash
yarn
yarn build:lib
cd cx-portal-shared-components
npm publish
```
