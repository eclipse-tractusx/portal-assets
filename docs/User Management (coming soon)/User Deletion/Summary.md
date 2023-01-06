# Summary

The user deletion is possible from 2 different sides

* My User Account 
* User Management (only available for user admins)


User accounts might be companyIdP federated or CX user accounts. In both scenarios the user deletion is implemented and will effect the user account itself, the user favorites, user roles as well as user attributes.

The deletion of users is audit relevant and will be audit logged inside the db.

More details to the audit logging can get found here: https://github.com/catenax-ng/tx-portal-assets/blob/945546d91065b8870aa8f69ce94b48eac7a5ade2/docs/Technical%20Details/Auditing.md
