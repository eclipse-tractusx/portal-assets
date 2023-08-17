# Release Process

The release process for a new version can roughly be divided into the following steps:

* [Preparations on the release branch](#preparations-on-the-release-branch)
* [Tag and build of versioned images](#tag-and-build-of-versioned-images)
* [Release new helm chart version](#release-new-helm-chart-version)
* [RC: checkout release-candidate branch](#rc-checkout-release-candidate-branch)
* [Merge release branch](#merge-release-branch)
* [RC: provide successive RC branch](#rc-provide-successive-rc-branch)
* [Create releases from tags](#create-releases-from-tags)

The process builds on the development flow which, usually, takes place within forks and leads to merged pull pull requests in the repositories of the eclipse-tractusx organization.

Frontend repositories:

* [Portal Frontend](https://github.com/eclipse-tractusx/portal-frontend)
* [Portal Frontend Registration](https://github.com/eclipse-tractusx/portal-frontend-registration)
* [Portal Assets](https://github.com/eclipse-tractusx/portal-assets)

Backend repository:

* [Portal Backend](https://github.com/eclipse-tractusx/portal-backend)

Continuous Deployment / CD repository (containing the portal helm chart)

* [Portal CD](https://github.com/eclipse-tractusx/portal-cd)

For assigning and incrementing **version** numbers [Semantic Versioning](https://semver.org) is followed.

## Preparations on the release branch

Checking out from the dev branch (or main for portal-assets) a release branch (release/{to be released version} e.g. release/v1.2.0, or respectively release/v1.2.0-RC1 for a release candidate).
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
* Known Knowns

In case of breaking change, the breaking change will get highlighted with a breaking change tag =) ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)

Example for commit message:

*release: update changelog for vx.x.x*

### 3. Aggregate migrations (backend repo only)

Migrations should be **aggregated in the case of releasing a new version**, in order to not release the entire history of migrations which accumulate during the development process.

Once a version has been released, migrations **mustn't be aggregated** in order to ensure upgradeability this also applies to **release candidates > RC1 and hotfixes**.
Be aware that migrations coming release branches for release candidates or from hotfix branches, will **need to be incorporated into dev and main**.

## RC: checkout release-candidate branch

If starting into a release candidate phase, make sure to checkout the release-candidate branch from dev branch of [Portal CD](https://github.com/eclipse-tractusx/portal-cd).

## Tag and build of versioned images

It's important to pull the latest state of the release branch locally in every repository.
Then create and push a tag for the released version.
The push of the tag triggers the release workflow action (available in every repository) which creates the versioned image/s.
The push also triggers the image tags to be updated in the helm chart: in the dev branch or respectively the release-candidate branch of the [Portal CD](https://github.com/eclipse-tractusx/portal-cd) repository.

Example for tag:

*v1.2.0*

Examples for tag messages:

*Version 1.2.0: Frontend Portal for the Catena-X*

*Version 1.2.0: Frontend Registration for the Catena-X*

*Version 1.1.0: Assets for the Catena-X Portal*

*Version 1.1.0: Backend for the Catena-X Portal*

## Release new helm chart version

Once the versioned images are available, a new version of the chart can be released.
The helm chart is released from [Portal CD](https://github.com/eclipse-tractusx/portal-cd).

Check out a release branch from the dev branch or from the release-candidate branch respectively.
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

Then merge the release branch into 'main' and merge afterwards 'main' in 'dev'. In the case of a release candidate, the release branch also needs to be merged into the release-candidate branch.

At the release of the chart, besides the official chart itself, there is also created a 'portal-x.x.x' tag.
This tag is used to install (with the convenience of the argocd-app-templates) or upgrade the version via AgroCD on the consortia K8s clusters.

## RC: provide successive RC branch

During a release candidate phase, checkout the successive 'RC' branch and push it to the server, so that it can it used for further bugfixes.

Example:

```bash
git checkout tags/v1.2.0-RC1 -b release/v1.2.0-RC2
```

Technically this step is already possible after [Tag and build of versioned images](#tag-and-build-of-versioned-images), but it's recommended to execute this step after [Release new helm chart version](#release-new-helm-chart-version), so that the image tag for the release in the release-candidate of [Portal CD](https://github.com/eclipse-tractusx/portal-cd) isn't overwritten by the push of the successive 'RC' branch.

## Merge release branch

The release branches must be is merged into main.
Afterwards, main into dev. This is only necessary for repositories with a dev branch.
Those merges need to happen via PRs.

Technically this step is already possible after [Tag and build of versioned images](#tag-and-build-of-versioned-images), but it's recommended to execute this step after [Release new helm chart version](#release-new-helm-chart-version), so that the image tag for the release isn't overwritten by the merge into dev or main respectively.

Example for PR titles:

*release(1.2.0): merge release into main*

*release(1.2.0): merge main to dev*

## Create releases from tags

Technically this step is already possible after [Tag and build of versioned images](#tag-and-build-of-versioned-images), but it's recommended to create the releases from the tags in the frontend and backend repositories only once the new helm chart version has been tested and released.

Examples for release messages:

*Version 1.2.0: Frontend Portal for the Catena-X*

*Version 1.2.0: Frontend Registration for the Catena-X*

*Version 1.1.0: Assets for the Catena-X Portal*

*Version 1.1.0: Backend for the Catena-X Portal*
