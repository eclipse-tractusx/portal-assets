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
<img width="260" alt="image" src="https://user-images.githubusercontent.com/94133633/210454359-7ed91a28-4293-4699-9dc2-58692b17b55d.png">

We can add additional translation files if needed for any additional language.
<br>
<br>

### CX-Portal

Inside the CX Portal, the locales are divided by pages.
<br>
<img width="150" alt="image" src="https://user-images.githubusercontent.com/94133633/210455893-bd9971e7-ab0d-429a-a507-416f88d4b601.png">
<br>
There is one main file holding the generic translation for often used items (e.g. "approval button", headlines,...) and a file for each specific page to translate not often used values.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam
