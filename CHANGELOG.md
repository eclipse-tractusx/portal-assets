# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Assets.

## 1.6.0-RC4

### Change
- Documentation of registration and technical integration updated (removal of all daps related documentation)
- Added new notification types and messages inside the notification service documentation
- Enhanced policy documentation as part of the user documentation of connectors

## 1.6.0-RC3

### Change
* App subscription activation docu enhanced by added activation overlay screenshot as example/reference with new content body
* Application checklist retrigger information added

### Feature
* App Change documentation released
* Upgrade info added
  * daps deletion

### Bugfix
* Dataspace Introduction - added missing direct links and deleted unnecesary links
* Network Participant Introduction - typos fixed

### Known Knowns
* Help application - side menu botton scrolling blocked and rendering broken

## 1.6.0-RC2

### Change
* Wallet Creation & Membership credential creation documentation as part of the technical registration approval documentation added
* Connector registration documentation (technical und functional) updated, covering the new input fields and api calls

### Feature
* SSI Credential Management (Request Flow) added
* App Instance URL change process added
* Notification user documentation added

## 1.6.0-RC1

### Change
* Connector Discovery
  * enhanced description with new endpoint function to allow empty string search
* Static JSON Content files
  * 'company participant' content updated and new styling/templates used
* App Release Process
  * updated the endpoint details to fetch app languages

### Feature
* Company Role config
  * released end user and developer documentation of the company role config (add role(s))
* Static JSON Content files
  * released dataspace introduction content
* End user documentation 'StyleGuide'
  * Design style guide released with first set of components/elements (e.g. button, drop down, search, etc.)
* Policy Management Examples added

### Bugfix
* Exchanged public/assets/images/content svg files due to breaking content because of the used fonts

## 1.5.0

### Change
* Help Application
  * styling update (UI&UX) as well as responsiveness improved
* UseCase content files updated, image types switched from .png to .svg to decrease the image sizes
* Couple of index.md files added displaying child chapters/pages
* Table of content added
  * 01.Onboarding/01.Registration Invite/index.md
  * 01.Onboarding/02.Registration/index.md
  * 01.Onboarding/03.Registration Approval/index.md
  * 02.User Management/03.Registration Approval/index.md
* User Management
  * edit user account used endpoints added inside the developer docu
* Technical Documentation
  * technical user roles and rights matrix updated
* App & Service Subscription flow details and endpoint introduction added for end users and developers

### Feature
* Help Application
  * About page for legal notice
    * About card added
    * About page added and linked in footer component
    * card component integrated in About page
* Developer docu "image handling" added
* Service Release Process docu added for developers and end users
* Service Subscription Activation docu added for developers and end users
* App Subscription Activation docu added for developers and end users

### Technical Support
* Help Application
  * Release.js & Setting.js updated to fetch documentation content from eclipse instead of forked repo
  * Upgraded the dependent libraries to latest related library version(s)
  * About page
    * enabled build and release workflows to provide content

### Bugfix
n/a

## 1.4.0

### Change
* Content files
  * use case introduction content file and images updated
* Developer docu
  * User Management - app access management docu added
  * Connector Registration - table error handling/support docu added

### Feature
* Company Configuration - Company Role Change
  * added static company role config content file (inside assets) to enable new portal frontend application feature "Company Configuration - Company Role Change"
* Technical Documentation - Notifications
  * added notification documentation for new supported notification types "User Role Change" and "Offer Release Request"
  * added developer documentation for notification "done" state
* User Management - Technical User Accounts
  * technical user permissions mapped to company roles to better manage available technical user permission based on the participant company role
* Service Release Documentation
  * service release flow with developer and end user documentation released
* Connector Registration
  * released managed connector developer and end user documentation
  * released developer documentation for technical user and connector mapping

### Technical Support
* added release workflow for release-candidates
* Enabled tag retrieval from github.ref_name
* Operator upgrade docu enhanced with recent changes for portal page (migration script)
  * License Types - NEW & ENHANCED
  * Technical User Profiles - NEW
* changed release workflow to retrieve tag from github.ref_name (set-output command deprecated)
* changed container registry to Docker Hub
* added pull request template

### Bugfix
n/a

## 1.3.0

### Change
* User Docu
  * User Management -> technical user -> FAQ updated with details to technical user token creation
  * App Release Process documentation enhanced (privacy policy function, document handling, improved/enhanced docu in general)
* Developer
  * Release Process documentation enhanced (license checks & publish shared-ui-components to npm)
  * Roles & Rights matrix updated (technical user)
  * Technical user roles architecture portal, portal db and keycloak connection - visualization image updated
  * User Management -> technical user -> FAQ added with details to technical user token creation
  * App Release Process  enhanced (fetch portal frame documents, verify app details, delete documents, privacy policy function, document handling, endpoint request body for change app,generally improved and enhanced)
  * Document Service documentation enhanced
  * Connector registration documentation related to daps enhanced
* Role Description Content
  * Markups removed
  * Translation file (de) updated
* Use Case Introduction
  * Images for the use case introduction page and reduced image size exchanged

### Feature
* Developer Docu
  * Company Config - Preferred Use Case docu released
  * User role assignment (apps and portal roles)
  * Upgrade documentation added
* User Docu
  * User role assignment - change user roles "how to" released (apps and portal roles)
  * Service Release Process - released process "how to"

### Technical Support
* added temp fix for CVE-2023-0464
* added build workflow for v1.3.0 release candidate phase
* updated actions workflows

### Bugfix
* User & DevDocu
  * Technical User Profile Matrix corrected (permission assignment overview)

## 1.2.0

### Change
* User Docu
  * service release process enhanced
* Developer
  * updated developer contribution process introduction
  * enhanced details on app marketplace implementations
  * enhanced app admin board operator implementation details

### Feature
* User Docu
  * added user role description details/role matrix
* Developer
  * multi-branch developer process released

### Technical Support
* reverse proxy server to run the entire portal frontend on local machine
* trg: added repo metafile
* trivy: fixed container registry

### Bugfix
n/a

## 1.1.0

### Change
* Developer 
  * app release process docu updated
  * roles & rights matrix updated
  * registration flow documentation updated with new data fields
  * identity & access user management docu enhanced
  * updated arc42 whitebox view
* User Docu 
  * technical user creation updated
  * registration flow documentation updated with new data fields
  * connector registration documentation enhanced

### Feature
* User Docu
  * service release process added
* Developer 
  * db data layer concept added
  * app deletion docu added
  * added db schema views
  * registration error handling .md added
  * external identity provider handling .md added
* Added new content folder for static template images (moved from portal to asset repo)

### Technical Support
* Added temp fix for CVE-2023-23916
* md file interlinking handling updated for help web page

### Bugfix
n/a

## 1.0.0-RC8

### Change
* Documentation v8 released (content and structural updates along the whole documentation and OpenAPI docu added)

### Feature
n/a

### Technical Support
n/a

### Bugfix
n/a


## 1.0.0-RC7

### Change
* Documentation v7 released (content and structural updates along the whole documentation)

### Feature
n/a

### Technical Support
n/a

### Bugfix
n/a


## 1.0.0-RC6

### Change
* Documentation v6 released (content and structural updates along the whole documentation)
* Split of user and developer documentation
* added web application search functionality across all the md files / documentation files

### Feature
n/a

### Technical Support
* temp fix for cve-2023-0286

### Bugfix
* fixed security findings


## 1.0.0-RC5

### Change
* Documentation v5 released (restructuring, adding developer docu, etc.)

### Feature
* help/documentation web application updated with search mechanism and document tree structure

### Technical Support
n/a

### Bugfix
n/a


## 1.0.0-RC4

### Change
* Documentation v4 released (service subscription; registration approval flow and docu)
* Use Case introduction content updated and enhanced

### Feature
* help/documentation web application released (based on md file content)

### Technical Support
n/a

### Bugfix
n/a


## 1.0.0-RC3

### Change
* Documentation v3 released (idp/auth developer docu)
* Use Case introduction content updated and enhanced

### Feature
n/a

### Technical Support
n/a

### Bugfix
n/a


## 1.0.0-RC2

### Change
* Documentation v2 released

### Feature
* Static page contents for portal company role and use case introductions released as part of assets/contents

### Technical Support
* n/a

### Bugfix
* n/a


## 1.0.0-RC1

### Change
* n/a

### Feature
* Documentation
 * Created user documentation (initial version)
 * Created admin/developer documentation (initial version)
 * Created architecture documentation (initial version)
 * Created interface documentatio (initial version)
* Portal Fonts implemented
* Portal api json for news section implemented 
* Portal standard images loaded (email, frame, icons, logos)

### Technical Support
* Repo build worklfows created and security scan enabled

### Bugfix
* n/a
