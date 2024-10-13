Cypress.Commands.add('runTests', (type, mode) => {
    const specPath = type === 'api' ? 'cypress/e2e/API/*.cy.js' : 'cypress/e2e/UI/*.cy.js';
    const headedFlag = mode === 'headed' ? '--headed' : '--headless';
    
    cy.exec(`npx cypress run --spec "${specPath}" ${headedFlag}`);
  });
  