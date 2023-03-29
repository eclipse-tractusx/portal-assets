## Summary

With the version 1.3.0, a couple of breaking changes got introduced which result into migration/db impact.
In the document below, the impact got described including description of the change, possible issues, mitigation/solutions

<br>
<br>

#### Service Details - NEW (interim) - 1.3.0

* NEW: table "service_details"

New service_detail table released to manage technical user need for services with a true/false flag.
Attributes
* service_id 
* service_type_id (connected to portal.service_types)
* technical_user_needed (true/false flag)

<img width="376" alt="image" src="https://user-images.githubusercontent.com/94133633/228341713-1bbc0354-0ebf-42f7-bc37-135567037b60.png">

Impact on existing data:
Migration script existing, based on the service type, the technical_user_needed attribute is set to "true" for "DATASPACE_SERVICE" services and "false" for "CONSULTANCE_SERVICE"

<br>
<br>

#### Mediatype - NEW & ENHANCED - 1.3.0

* NEW: table "media_types"
* ENHANCED: table portal.documents "media_type_id" added

Impact on existing data:
As part of the migration, the existing file ending/type available in documents.name will be used to set the media_type_id. Important: check beforehand if all documents have a document type added inside the document name. If not, add the document type or delete the document.
Additionally check if all stored documents are supported by the types migrated in table porta.media_type. In case any other document type is currently loaded/stored, the migration will fail. In this case delete the document beforehand or enhance the migration script media types supported.

<br>
<br>

#### Application Checklist - ENHANCED - 1.2.0

* NEW: portal.processes
* NEW: portal.process_types
* ENHANCED: table company_applications "checklist_process_id" added
* ENHANCED: table process_steps "process_id" added
* REMOVED: removed table application_assigned_process_steps

Impact on existing data:
Existing company registration will automatically get enhanced with the respective attributes. No manual intervention needed. Active 


