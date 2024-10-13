import AiraloHomePage from '../../pageObjects/airaloHomePage';
const airaloHomePage = new AiraloHomePage();

describe('Airalo UI Test for Buying Japan eSIM', () => {
  before(() => {
    // Load base URL and test data from the fixture
    cy.fixture('testData').as('data');
    cy.visit('/');

    // Accept cookie consent if visible
    cy.get('#onetrust-accept-btn-handler', { timeout: 10000 }).click();

    // Conditionally handle the push notification popup (skip in headless mode)
    if (!Cypress.config('isHeadless')) {
      cy.get('body').then((body) => {
        if (body.find('#wzrk-cancel').length > 0) {
          // If the element is found, click it
          cy.get('#wzrk-cancel', { timeout: 10000 }).click();
        }
      });
    }
  });

  it('should search for Japan and buy the eSIM package', function () {
    const { country, product } = this.data;

    // Step 1: Wait for the search input to be enabled, then type the country name
    airaloHomePage.searchField()
      .should('be.visible')
      .and('not.be.disabled')
      .type(country);  

    // Step 2: Select the first visible autocomplete option for the country
    cy.get('span').contains(country)
      .should('be.visible')
      .click(); 

    // Step 3: Click the first "BUY NOW" button in the eSIM package list
    airaloHomePage.buyNowButtonInList().first()
      .should('be.visible')
      .click();

    // Step 4: Verify the modal popup details
    verifyModalDetails(product);
  });

  // Function to verify modal details
  function verifyModalDetails(product) {
    airaloHomePage.modalTitle().should('contain.text', product.title);
    airaloHomePage.modalCoverage().should('contain.text', product.coverage);
    airaloHomePage.modalData().should('contain.text', product.data);
    airaloHomePage.modalValidity().should('contain.text', product.validity);
    airaloHomePage.modalPrice().should('contain.text', product.price);
  }
});
