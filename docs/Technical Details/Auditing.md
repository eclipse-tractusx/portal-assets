# Audit Logging

For db audit logs, 2 generic approaches are used

 * PostgreSQL Session Logging (pgAudit)
 * Application Logging
<br>
<br>

## PostgreSQL Session Logging (pgAudit)
<br>
PgAudit module is enabled for the portal db via the Bitnami PostgreSQL Image:
<br>
https://github.com/bitnami/bitnami-docker-postgresql#auditing
<br>
<br>

Following operations are audited: WRITE, DDL
WRITE: INSERT, UPDATE, DELETE, TRUNCATE, and COPY
DDL: CREATE, ALTER, and DROP schema objects
For a complete list of auditable operations see https://github.com/pgaudit/pgaudit#pgauditlog

<br>

In addition the parameters time stamp with milliseconds, user name and database name are configured as log line prefixes.

<br>

Future enhancements: Auditing logging on application side namely in the backend. The auditing on db level with pgAudit doesn't provide the information by which person specific user an operation was triggered because db operations are executed by our generic db users (for instance the 'portal').

<br><br>

## Application Audit Logging

Application Audit Logging is implemented  to fulfill and enable extended audit log functionalities for the CX portal.

In the implementation the possibility of pgAudit extension and db table logging inside the postgreSQL was validated.

Due to the functional requirement to enable serach, quick validations and audit traceability, the in-DB audit implementation got preferred.

<br>

<strong>Implementation Details</strong>

What: for each audit relevant table, an audit_tablename_version table is created and storing any original table INSERT, DELETE or UPDATE records. Important, we always store:

- Who changed
- What
- When

<br>

<strong> Why we use versioning for the audit tables?</strong>

          To ensure that an audit table is never modified, but only entries are added, we have introduced versioning for audit table.

          Each audit table has version suffix in the name, this corresponds to the name of the migration in which the audit table was added.

          See the example below for further information:

<br>

<strong> How to enable an entity to be auditable in the code (Example: CompanyUser)</strong>

1. The auditable entity needs to implement interface 'IAuditable'
       public class CompanyUser : IAuditable

2. Create Audit entity which should derive from the auditable entity and implement IAuditEntity

       public class AuditCompanyUser : CompanyUser, IAuditEntity

3. Add DbSet in PortalDbContext for the newly created Entity

       public virtual DbSet<AuditCompanyUser> AuditCompanyUsers { get; set; } = default!;

4. Add .ToTable configuration to the OnModelCreating for the auditable entity

       entity.ToTable("company_users")

5. Add modelBuilder.Entity configuration to the OnModelCreating for the audit table ignore all virtual properties of the base entity. !IMPORTANT! -> The tablename of the audit table must exactly match the name of the migration in snakecase and beginn with audit_.

       modelBuilder.Entity<AuditCompanyUser>(x =>   {          x.HasBaseType((Type?)null);             x.Ignore(x => x.Company);           x.Ignore(x => x.IamUser);           x.Ignore(x => x.Consents);           x.Ignore(x => x.Documents);           x.Ignore(x => x.Invitations);           x.Ignore(x => x.Apps);           x.Ignore(x => x.UserRoles);           x.Ignore(x => x.CompanyUserAssignedRoles);           x.Ignore(x => x.CompanyUserAssignedBusinessPartners);           x.Ignore(x => x.Notifications);           x.Ignore(x => x.CreatedNotifications);             x.ToTable("audit_company_users_cplp_1254_db_audit");       });`

6. Add Migration as described in the readme.md in CatenaX.NetworkServices.PortalBackend.Migrations the name must match the table name of the audit table

       20220802122302_CPLP-1254-db-audit

7. Add the AuditTrigger to the created migration. Add migrationBuilder.AddAuditTrigger<T>("versionName") at the end of the Up method and migrationBuilder.DropAuditTrigger<T>() to the beginning of the Down method. T should be the Audit Entity and the version should equal the backpart of the name of the migration without timestamp as snakecase.

<br>
 
Up:

       migrationBuilder.AddAuditTrigger<AuditCompanyUser>("cplp_1254_db_audit");

Down:

       migrationBuilder.DropAuditTrigger<AuditCompanyUser>();

<br>

Additional relevant information:

       (warning) If not already existing in the original table, a uuid and last_editor_id attribute need to get added to the original id.
       (warning) whenever the original table attributes are changed (e.g. adding an attribute or deleting and attribute) the already existing audit table will be set to frozen and a new audit table is getting created. All new audit relevant records will be stored in the new audit table
