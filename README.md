# Airalo Test Automation

This project contains test automation scripts for the Airalo platform, implemented using Cypress. It includes both API and UI tests to validate functionalities related to eSIM purchases.

## File Descriptions
cypress/e2e/API/airaloApiTest.cy.js: Contains the test cases for the Airalo API, including placing an order and retrieving SIMs.

cypress/e2e/UI/airaloUiTest.cy.js: Contains the UI test cases, such as searching for a country and purchasing an eSIM.

cypress/fixtures/apiData.json: JSON file storing API credentials and order details used in API tests.

cypress/fixtures/testData.json: JSON file storing UI test data, such as country and product details.

cypress/pageObjects/airaloHomePage.js: Page object model for the Airalo home page, which helps in encapsulating DOM elements and actions.

cypress/support/commands.js: Custom commands for Cypress, allowing for reusable code across tests.

cypress.config.js: Configuration settings for Cypress, including environment variables.

package.json: Contains project metadata, scripts for running tests, and dependencies.

README.md: Documentation for the project, explaining setup instructions and an overview of the tests.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (version 14 or later)
- [Cypress](https://www.cypress.io/) (automatically installed via package.json)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohammed-Bilal/Coding_Exercise
   cd airalo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running Tests

You can run tests for both API and UI using the following commands:

- **Run API tests in Headless mode**:
  ```bash
  npm run test:api:headless
  ```

- **Run API tests in Headed mode**:
  ```bash
  npm run test:api:headed
  ```

- **Run UI tests in Headless mode**:
  ```bash
  npm run test:ui:headless
  ```

- **Run UI tests in Headed mode**:
  ```bash
  npm run test:ui:headed
  ```

## Test Implementation Overview

### API Tests (`cypress/e2e/API/airaloApiTest.cy.js`)

- **Purpose**: Validate the Airalo API for ordering eSIMs and retrieving SIM details.
- **Key Steps**:
    - Load API credentials and order details from a fixture.
    - Request an access token before each test, ensuring it exists.
    - Place an order for 6 eSIMs and validate the response.
    - Retrieve the list of SIMs and verify that the IDs match those from the order.

### UI Tests (`cypress/e2e/UI/airaloUiTest.cy.js`)

- **Purpose**: Validate the UI functionalities for searching and purchasing an eSIM.
- **Key Steps**:
    - Load the base URL and test data from a fixture.
    - Accept cookie consent if visible.
    - Search for Japan and select the corresponding eSIM package.
    - Validate the modal popup details to ensure they match the expected product information.

## Conclusion
All automated tests have been executed successfully, with results aligning with the expected outcomes. This solution demonstrates proficiency with Cypress and automated testing practices.
