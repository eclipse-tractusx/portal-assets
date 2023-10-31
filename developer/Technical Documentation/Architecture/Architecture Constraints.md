# Architecture Constraints

## General

- Homogenous UI/UX design across all user facing elements.

- Run anywhere: can be deployed as a docker image, e. g. on Kubernetes (platform-independent, cloud, on prem or local).

- Modular design: core-components are loosely coupled.

- Freedom of choice for technology components stops where UX is negatively impacted. (currently under revision by the overall catena architecture roundtable)

- Multi Language: German and english to be supported as a minimum

## Developer

- OpenSource software first - FOSS licenses approved by the eclipse foundation has to be used. It could represent the initial set that the CX community agrees on to regulate the content contribution under FOSS licenses.

- Coding guidelines for FE and BE are defined and are to be followed for all portal related developments.

- Apache License 2.0 - Apache License 2.0 is one of the approved licenses which should be used to respect and guarantee Intellectual property (IP).

- Code Analysis, Linting and Code Coverage - Consistent style increases readability and maintainability of the code base. Hence, we use analyzers to enforce consistency and style rules. We enforce the code style and rules in the CI to avoid merging code that does not comply with standards.

## Code analysis, linting and code coverage

--comming soon---
(Veracode; Eslinter, Sonarcloud, etc.)
