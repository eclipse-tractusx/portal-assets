# Release Process

The release process for a new version can roughly be divided in five steps:

* Preparation
* Build of a versioned image
* Release of a new helm chart version
* Merge upstream to eclipse-tractusx

The process builds on the development flow which takes place within the forks from eclipse-tractusx, located in the catenax-ng organization.

The relevant frontend repositories are the following:
* https://github.com/catenax-ng/tx-portal-frontend
* https://github.com/catenax-ng/tx-portal-frontend-registration
* https://github.com/catenax-ng/tx-portal-assets

The relevant backend repository is the following:
* https://github.com/catenax-ng/tx-portal-backend

## Preparation

It's recommended to do step 1-3 in one preparatory pull request to main, or dev respectively.

1. Update changelog file

The changelog file tracks all notable changes since the last released version.
During development every developer should extend the changelog under the 'Unreleased' section when raising a pull request to main or dev.
Once a new version is ready to be released, the changelog of the version gets finalized and the release version for the, up to then, unreleased changes gets set.
The following convention is a good practice for a clearly structured changelog:
https://keepachangelog.com/en/1.0.0/

2. Update dependencies file

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

3. Version bump (frontend repos only)

The version in the 'package.json' files needs to get bumped, the following statement can be used:

```bash
yarn version
```

4. Merge from dev into main branch

The merge from dev into main, via pull request, needs to happen before releasing.
This is only necessary for repositories with a dev branch e.g., tx-portal-frontend and tx-portal-frontend-registration.

## Build of a versioned image

It's important to pull the latest state from main of every repository.
Then a tag for the released version (e.g. v0.10.0) needs to be created and pushed.
The push of the tag triggers the release workflow action (available in every repository) which creates the versioned image/s.

## Release of a new helm chart version

Once the versioned images are available, they can be referenced in the portal helm chart and a new version of the chart can be released.
The consortia specific helm chart is released from the 'helm environments' branch available in the https://github.com/catenax-ng/tx-portal-cd fork.
The official portal helm chart is released from the main branch of https://github.com/eclipse-tractusx/portal-cd.

## Merge upstream to eclipse-tractusx

Once a new version has been released, it should be merged upstream to eclipse-tractusx and tagged.

The relevant frontend repositories are the following:

* https://github.com/eclipse-tractusx/portal-frontend
* https://github.com/eclipse-tractusx/portal-frontend-registration
* https://github.com/eclipse-tractusx/portal-assets

The relevant backend repository is the following:

* https://github.com/eclipse-tractusx/portal-backend
