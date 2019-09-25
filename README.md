## Verified Organizations Network (VON) Quick-start Demo

#### About VON

The goal of the Verifiable Organizations Network (VON) project is to explore the design of an open, unified and trusted network of organizational data for use by people and services across British Columbia. The network can reduce the effort put forward by people looking to use services requiring data about their organization since it is readily available from trusted sources.

VON offers government digital service providers the possibility of dramatically improving their users' service experience. This is accomplished through open and simple access to authenticated organizational data so their users don't need to find and re-enter data the government already holds. Data is simply shared when its open, or shared with authorized consent.

*Most up to date website* [https://vonx.io](https://vonx.io)

#### About this project

This project (an instance of decentralized workFlow) demonstrates a basic application for deploying the VON-X library, in order to enable issuer registration, claims verification, and credential submission to TheOrgBook. It includes Docker tooling for deployment of the application behind an nginx reverse proxy.

##### The business scenario

The business problem addressed in this demo is a business trying to get Business Permits and Licences in their local municipality. Getting such authorizations are complicated processes, often requiring contacting multiple jurisdictions to acquire multiple credentials - licenses, permits, registrations, etc., each of which may require the presentation of previously acquired credentials from other sources. This demo simplifies the problem by:

Asking the user to select the business goal they are trying to achieve. For example, a Business Licence to open a restaurant, or a "Dog and Cat Breeder" permit.
Starting from the goal, evaluating the Hyperledger Indy prerequisite proof request to determine the credentials needed to acquire that credential.
Repeating that process for each pre-requisite credential until all the necessary licenses are determined
Presenting the user with a list of the credentials needed and the order of acquisition necessary to meet the prerequisites - e.g. starting from the credentials that have no prerequisites.
Laying over that the list of Credentials the business has already acquired.
Allowing the user to click from the list of needed credentials screen to either the application for that credential (if not yet acquired), or to TheOrgBook screen to see the already acquired credential.

# EdxAriescloudClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
