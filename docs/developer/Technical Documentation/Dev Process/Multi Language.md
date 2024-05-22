# Multi Language

## Summary

Multi-Language support is planned for the Portal and Registration App in two languages
<br>

- English
- German
  <br>
  <br>
  The multi language function is mainly implemented on front-end side via i18next.
  <br>
  I18next is an internationalization-framework for react and ideal to support multi language function in web applications.
  <br>
  <br>

i18next provides following add-ons:

- detect the user language
- load the translations
- optionally cache the translations
- extension, by using post-processing - e.g. to enable sprintf support

=> get more details (https://www.i18next.com/overview/plugins-and-utils)
<br>
<br>

## Technical Implementation

### Portal-Registration

There is a locales folder in src which contains subfolders according to respective language codes as shown in the screenshot shared, like 'de'(German), 'en'(English). These folders contain the translation.json file used for translations.
<br>
<img width="260" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/file-structure-translations.png">

We can add additional translation files if needed for any additional language.
<br>
<br>

### CX-Portal

Inside the CX Portal, the locales are divided by pages.
<br>
<img width="150" alt="image" src="https://raw.githubusercontent.com/eclipse-tractusx/portal-assets/main/docs/static/portal-path-locales.png">
<br>
There is one main file holding the generic translation for often used items (e.g. "approval button", headlines,...) and a file for each specific page to translate not often used values.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets
