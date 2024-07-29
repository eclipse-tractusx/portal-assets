# Summary

The mailing process handles the sending of e-mails to users it therefor retrieves all entries of the `mailing_informations` with status `PENDING`. The process steps are the following:

```mermaid
flowchart TD
    A[SEND_MAIL]
    A --> A
```

## External dependencies

The process worker communicates with the email service.

## SEND_MAIL

The process step `SEND_MAIL` retrieves two entries from the `mailing_informations` table with status `PENDING` if available. The first one will be send as a mail, if there are more than one entry available the process step will create a new `SEND_MAIL` process step.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
