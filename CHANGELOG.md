# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Assets.

## unreleased

- moved documentation for button, datepicker and dropdown to storybook in shared components

## 1.8.0

### Change

Portal assets:

- added portal registration application images and connected the image store with the registration application repository
- created a new section to display standard library info in osp page

Documentation app:

- enhanced developer documentation by adding db table details about entity 'Agreements' incl. db schema
- moved developer into docs directory and enable docs app
- moved helper user docs into user directory and enable docs app
- moved pen test information to Tests.md
- updated test automation docs
- removed obsolete version files
- enhanced documentation for technical user view
- removed references to consortia environments
- removed image reference to catena-ng
- adjusted directory structure for app and service release process documentation
- enhanced local development documentation for frontend in regards to backend and interface connection
- added image "use"-guidelines to contributing guide
- added developer documentation details for the endpoint usage of /api/apps/start-autosetup
- updated bpdm interface contract details regarding the integration of the portal with the BPDM service (golden record and gate service)
- updated the documentation of the registration flow by making it more user friendly; including a process description, data flow diagrams and api calls supported
- documentation for "Wallets" and "Credentials" added including the restructuring of the folder content "Technical Integration"
- improved offer release process documentation
- updated security assessment
- added identity documentation
- enhanced app flow documentation
- added company certificate management details
- extended osp documentation
- updated version upgrade details

### Feature

n/a

### Technical Support

- added automatic linter and build checks for newly created pull request
- added additional image tags of type semver to release workflows
- removed picture references to user-images in documentation by adding all images to 'docs static'
- changed portal-cd references to portal due to repository renaming
- updated README.md
  - mentioned `docs` folder in portal-assets repository
  - referenced docker notice files in notice section instead of duplicating the content

### BugFixes

Portal assets:

- added standard library template to sections under company roles
- assets/content (companyRole and dataspace): added title and description to the standard library section based on the company role

Documentation app:

- fixed relative links in documentation app

## 1.7.0

### Change

- Portal Version Upgrade
  - updated documentation for fixes, changes and news
  - added information about PostgresSQL upgrade and recommended upgrade approach
  - added table of content
- Technical Documentation
  - updated documentation for application monitoring options
  - updated documentation about application auditing
- Technical User documentation
  - enhanced developer documentation of technical user deletion function
  - added technical user credential reset documentation/flow
  - dev documentation of new added technical user filters
- Credential Management
  - updated end user documentation of allowed file types and size for VC request flow
  - added new endpoint in developer documentation regarding requestable credentials
  - added end user FAQ
- Technical User Role Definition
  - removed 'Connector User' and 'App Tech User'
  - updated 'Service Management' to 'Offer Management'
  - added 'Semantic Model Management', 'Dataspace Discovery', 'CX Membership Info'
  - updated permission assignment (R&R matrix documentation & portal upgrade script provided for portal db)
- Legal information for distributions [TRG 7.05](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-05/)
  - added legal info at build
- updated static template guidelines
- enhanced/updated content for app provider introduction page
- added onboarding service provider introduction page
- added list of standard technical user needed to run the portal application integration with core applications
- updated identity provider connection documentation (developer & end user) for new flow
- enhanced subscription management board (service provider) documentation (developer & end user)
- updated app change process (roles, tenant url, etc.) for developers and end users
- interface contract documentation for 'Clearinghouse' updated with new architecture images and additional details of relevant authentication users and used endpoints
- traceability use case page images and text sections updated for release 23.12
- useCase content file updated
- images linked for traceability useCase exchanged
- added documentation for service account sync
- added documentation for app change documents
- added license notice and image licenses
- added notice to md files in docs and developers directory
- added check for license info headers, footers and files in pr-template
- added security assessment documentation and removed data-flow diagram (integrated in security assessment)
- moved iam specific documentation to portal-iam repository
- updated documentation for bulk user creation
- updated bpdm interface contract
- updated offer authentication flow
- fixed typos

### Feature

- Service Change Process
  - released documentation of 'Service Deactivation'

### Bugfix

- updated background color used in static page last section
- fixed links in md files

### Technical Support

- upgraded dependencies
- moved some images referenced in md file from GitHub to docs/static directory
- added linter rules and prettify gitHub actions for asset repo and fixed findings
- Trivy scan: changed to no failure on high findings, as it should only fail if there is an error/misconfiguration
- added pull request linting

## 1.6.1

### Change

- Technical documentation enhanced
- Typos for company roles fixed

### Technical Support

- Build images also for arm64, in addition to amd64
- Security.md updated
- npm-get-version action updated

## 1.6.0

### Change

- Documentation of registration and technical integration updated (removal of all daps related content)
- Added new notification types and messages inside the notification service documentation
- App subscription activation docu enhanced with activation overlay images with new content body
- Application checklist retrigger flow and endpoint information added
- Wallet Creation & Membership credential creation documentation as part of the technical registration approval documentation added
- Connector registration documentation (technical and functional) updated, covering the new input fields and api calls
- Connector Discovery description enhanced with new endpoint function to allow empty string search
- Static JSON Content files
  - 'company participant' content updated and new styling/templates used
- App Release Process developer documentation updated incl. additional endpoint details to fetch app languages
- index md files added for a synchronized sub-folder navigation inside the help application
- Rights & Roles concept updated

### Feature

- App Change documentation released
- Added policy documentation as part of the user documentation of connectors
- SSI Credential Management (Request Flow & Admin Board) developer and end user documentation added
- Notification user documentation added
- Company Participant Role end user and developer documentation released (add role(s) & remove role(s))
- Static JSON Content files
  - released dataspace introduction content
- End user documentation 'StyleGuide'
  - Design style guide released with first set of components/elements (e.g. button, drop down, search, etc.)
- Technical User developer and end user documentation enhanced by own/managed tech user endpoints

### Technical Support

- changed license notice for images
- removed references to demo environments inside the json consent files as well as system documentation
- enhanced upgrade details documentation by adding
  - Company Credential Details (new SSI related DB schema updates and static data migration)
  - Language table schema update to support multiple languages in future

### Bugfix

- upgraded dependencies
- reduced the height of side menu in the help section
- exchanged public/assets/images/content svg files due to breaking content because of the used fonts inside the svg images

## 1.5.0

### Change

- Help Application
  - styling update (UI&UX) as well as responsiveness improved
- UseCase content files updated, image types switched from .png to .svg to decrease the image sizes
- Couple of index.md files added displaying child chapters/pages
- Table of content added
  - 01.Onboarding/01.Registration Invite/index.md
  - 01.Onboarding/02.Registration/index.md
  - 01.Onboarding/03.Registration Approval/index.md
  - 02.User Management/03.Registration Approval/index.md
- User Management
  - edit user account used endpoints added inside the developer docu
- Technical Documentation
  - technical user roles and rights matrix updated
- App & Service Subscription flow details and endpoint introduction added for end users and developers

### Feature

- Help Application
  - About page for legal notice
    - About card added
    - About page added and linked in footer component
    - card component integrated in About page
- Developer docu "image handling" added
- Service Release Process docu added for developers and end users
- Service Subscription Activation docu added for developers and end users
- App Subscription Activation docu added for developers and end users

### Technical Support

- Help Application
  - Release.js & Setting.js updated to fetch documentation content from eclipse instead of forked repo
  - Upgraded the dependent libraries to latest related library version(s)
  - About page
    - enabled build and release workflows to provide content

### Bugfix

n/a

## 1.4.0

### Change

- Content files
  - use case introduction content file and images updated
- Developer docu
  - User Management - app access management docu added
  - Connector Registration - table error handling/support docu added

### Feature

- Company Configuration - Company Role Change
  - added static company role config content file (inside assets) to enable new portal frontend application feature "Company Configuration - Company Role Change"
- Technical Documentation - Notifications
  - added notification documentation for new supported notification types "User Role Change" and "Offer Release Request"
  - added developer documentation for notification "done" state
- User Management - Technical User Accounts
  - technical user permissions mapped to company roles to better manage available technical user permission based on the participant company role
- Service Release Documentation
  - service release flow with developer and end user documentation released
- Connector Registration
  - released managed connector developer and end user documentation
  - released developer documentation for technical user and connector mapping

### Technical Support

- added release workflow for release-candidates
- Enabled tag retrieval from github.ref_name
- Operator upgrade docu enhanced with recent changes for portal page (migration script)
  - License Types - NEW & ENHANCED
  - Technical User Profiles - NEW
- changed release workflow to retrieve tag from github.ref_name (set-output command deprecated)
- changed container registry to Docker Hub
- added pull request template

### Bugfix

n/a

## 1.3.0

### Change

- User Docu
  - User Management -> technical user -> FAQ updated with details to technical user token creation
  - App Release Process documentation enhanced (privacy policy function, document handling, improved/enhanced docu in general)
- Developer
  - Release Process documentation enhanced (license checks & publish shared-ui-components to npm)
  - Roles & Rights matrix updated (technical user)
  - Technical user roles architecture portal, portal db and keycloak connection - visualization image updated
  - User Management -> technical user -> FAQ added with details to technical user token creation
  - App Release Process enhanced (fetch portal frame documents, verify app details, delete documents, privacy policy function, document handling, endpoint request body for change app,generally improved and enhanced)
  - Document Service documentation enhanced
  - Connector registration documentation related to daps enhanced
- Role Description Content
  - Markups removed
  - Translation file (de) updated
- Use Case Introduction
  - Images for the use case introduction page and reduced image size exchanged

### Feature

- Developer Docu
  - Company Config - Preferred Use Case docu released
  - User role assignment (apps and portal roles)
  - Upgrade documentation added
- User Docu
  - User role assignment - change user roles "how to" released (apps and portal roles)
  - Service Release Process - released process "how to"

### Technical Support

- added temp fix for CVE-2023-0464
- added build workflow for v1.3.0 release candidate phase
- updated actions workflows

### Bugfix

- User & DevDocu
  - Technical User Profile Matrix corrected (permission assignment overview)

## 1.2.0

### Change

- User Docu
  - service release process enhanced
- Developer
  - updated developer contribution process introduction
  - enhanced details on app marketplace implementations
  - enhanced app admin board operator implementation details

### Feature

- User Docu
  - added user role description details/role matrix
- Developer
  - multi-branch developer process released

### Technical Support

- reverse proxy server to run the entire portal frontend on local machine
- trg: added repo metafile
- trivy: fixed container registry

### Bugfix

n/a

## 1.1.0

### Change

- Developer
  - app release process docu updated
  - roles & rights matrix updated
  - registration flow documentation updated with new data fields
  - identity & access user management docu enhanced
  - updated arc42 whitebox view
- User Docu
  - technical user creation updated
  - registration flow documentation updated with new data fields
  - connector registration documentation enhanced

### Feature

- User Docu
  - service release process added
- Developer
  - db data layer concept added
  - app deletion docu added
  - added db schema views
  - registration error handling .md added
  - external identity provider handling .md added
- Added new content folder for static template images (moved from portal to asset repo)

### Technical Support

- Added temp fix for CVE-2023-23916
- md file interlinking handling updated for help web page

### Bugfix

n/a

## 1.0.0-RC8

### Change

- Documentation v8 released (content and structural updates along the whole documentation and OpenAPI docu added)

### Feature

n/a

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC7

### Change

- Documentation v7 released (content and structural updates along the whole documentation)

### Feature

n/a

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC6

### Change

- Documentation v6 released (content and structural updates along the whole documentation)
- Split of user and developer documentation
- added web application search functionality across all the md files / documentation files

### Feature

n/a

### Technical Support

- temp fix for cve-2023-0286

### Bugfix

- fixed security findings

## 1.0.0-RC5

### Change

- Documentation v5 released (restructuring, adding developer docu, etc.)

### Feature

- help/documentation web application updated with search mechanism and document tree structure

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC4

### Change

- Documentation v4 released (service subscription; registration approval flow and docu)
- Use Case introduction content updated and enhanced

### Feature

- help/documentation web application released (based on md file content)

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC3

### Change

- Documentation v3 released (idp/auth developer docu)
- Use Case introduction content updated and enhanced

### Feature

n/a

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC2

### Change

- Documentation v2 released

### Feature

- Static page contents for portal company role and use case introductions released as part of assets/contents

### Technical Support

- n/a

### Bugfix

- n/a

## 1.0.0-RC1

### Change

- n/a

### Feature

- Documentation
- Created user documentation (initial version)
- Created admin/developer documentation (initial version)
- Created architecture documentation (initial version)
- Created interface documentatio (initial version)
- Portal Fonts implemented
- Portal api json for news section implemented
- Portal standard images loaded (email, frame, icons, logos)

### Technical Support

- Repo build worklfows created and security scan enabled

### Bugfix

- n/a
