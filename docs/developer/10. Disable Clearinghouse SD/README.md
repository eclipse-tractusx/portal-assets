# Summary

This feature arises from the current portal's implementation, which mandates the clearinghouse compliance process for creating signed documents for the legal person.

The result is a high dependency in the registration flow on the clearinghouse connection. To ensure a smooth procedure in case of the unavailability of this interface, the toggle was implemented.

This enables the process to be finished, and the customer to proceed with their journey without sacrificing the details in the long run. Due to the implementation of a retrigger process, the data quality is ensured, and the skipped SD information is recreated at a later stage.

- [Use Case Diagrams](/docs/developer/10.%20Disable%20Clearinghouse%20SD/Use-Case-Diagrams.md)

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
