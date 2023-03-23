# Release Process

The release process for a new version can roughly be divided in the following steps:

* Preparations on the release branch
* Tag and build of a versioned image
* Merge release branch
* Release of a new helm chart version (consortia / helm-environments)
* Maintain upstream (eclipse-tractusx)

The process builds on the development flow which takes place within the forks from eclipse-tractusx, located in the catenax-ng organization.

The relevant frontend repositories are the following:

* https://github.com/catenax-ng/tx-portal-frontend
* https://github.com/catenax-ng/tx-portal-frontend-registration
* https://github.com/catenax-ng/tx-portal-assets

The relevant backend repository is the following:
* https://github.com/catenax-ng/tx-portal-backend

For assigning and incrementing **version** numbers [Semantic Versioning](https://semver.org) is followed.

## Preparations on the release branch

Checking out from the dev branch (or main for portal-assets) a release branch (release/{to be released version} e.g. release/1.2.0) is created.
On the release branch the following steps are executed:

### 1. Update changelog file

The changelog file tracks all notable changes since the last released version.
During development every developer should extend the changelog under the 'Unreleased' section when raising a pull request to main or dev.
Once a new version is ready to be released, the changelog of the version gets finalized and the release version gets set for the, up to then, unreleased changes.
In the released version, the changelog is structured as following:

* Changes
* Features
* Technical Support
* Bug Fixes

In case of breaking change, the breaking change will get highlighted with a breaking change tag => ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)

Example for commit message: *release: update changelog for vx.x.x*

### 2. Update dependencies file

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

Example for commit message: *release: update dependencies file for vx.x.x*

### 3. Version bump (frontend repos only)

The version in the 'package.json' files needs to get bumped, the following statement can be used:

```bash
yarn version
```

Example for commit message: *release: bump version for vx.x.x*

### 4. Aggregate migrations (backend repo only)

Migrations should be **aggregated in the case of releasing a new version**, in order to not release the entire history of migrations which accumulate during the development process.

Once a version has been released, migrations **mustn't be aggregated** in order to ensure upgradeability this also applies to **release candidates > RC1 and hotfixes**.
Be aware that migrations coming release branches for release candidates or from hotfix branches, will **need to be incorporated into dev and main**.

## Tag and build of a versioned image

It's important to pull the latest state of the release branch locally in every repository.
Then create and push a tag for the released version.
The push of the tag triggers the release workflow action (available in every repository) which creates the versioned image/s.

Example tag frontend repos:
*1.2.0*

Example tag backend repo:
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

## Release of a new helm chart version (consortia / helm-environments)

Once the versioned images are available, they can be referenced in the portal helm chart and a new version of the chart can be released.
The consortia specific helm chart is released from the 'helm environments' branch available in the https://github.com/catenax-ng/tx-portal-cd fork.
The official portal helm chart is released from the main branch of https://github.com/eclipse-tractusx/portal-cd after the merge upstream.

Check out a release branch from 'helm environments'.
On the release branch the following steps are executed:

1. Bump image and chart version

2. Update changelog file

3. Update README (chart and root level)

Use [helm-docs](https://github.com/norwoodj/helm-docs) (gotemplate driven) for updating the README file.

```bash
helm-docs --chart-search-root [charts-dir] --sort-values-order file
```

Copy updated README file on chart level to root level.

Once the steps done, create a PR to merge the release branch into 'helm-environments'.

After the merge, execute the 'Release Chart' action via workflow dispatch on the 'helm-environments' to release the new chart.

## Maintain upstream (eclipse-tractusx)

### Upstream for source code repositories

Once a new image version has been tagged in the fork and as a resulted built, it needs to be merged upstream to eclipse-tractusx, tagged and released.

The relevant frontend repositories are the following:

* https://github.com/eclipse-tractusx/portal-frontend
* https://github.com/eclipse-tractusx/portal-frontend-registration
* https://github.com/eclipse-tractusx/portal-assets

The relevant backend repository is the following:

* https://github.com/eclipse-tractusx/portal-backend

Example for PR title: *feat!: merge upstream v1.2.0*

Example for PR description:
*The last merge into main was for v1.2.0. This PR contains the delta up to v1.1.0. All changes can be found in the changelog*

### Upstream for portal-cd

Checking out from the main branch in the fork a *release(x.x.x e.g. 1.2.0)/add-helm-env-updates-to-main* branch is created.
Then copy all the relevant changes from the 'helm environments' branch into the release branch. Essentially, everything should be copied with the exception of the following:

* environment specific values files in the portal chart directory
* argocd-*
* charts/pgadmin4
* scripts
* **.git**

Merge the release branch into main via PR.
Example for PR title: *release(1.2.0): add helm-environments updates*

Then upstream main.

After the merge, execute the 'Release Chart' action via workflow dispatch on main to release the new chart.
