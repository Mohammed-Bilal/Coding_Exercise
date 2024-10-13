class AiraloHomePage {
    // Input search field
    searchField() {
        return cy.get('input[data-testid="search-input"]');
    }

    // Country suggestion in dropdown
    searchSuggestion(country) {
        return cy.contains('div', country);
    }

    // Select specific eSIM package
    simPackageLink(title) {
        return cy.get('a[data-testid="sim-package-item"]').contains(title);
    }

    // Buy Now button in the package list
    buyNowButtonInList() {
        return cy.get('button').contains('BUY NOW');
    }

    // Modal Title, Coverage, Data, Validity, Price
    modalTitle() {
        return cy.get('p[data-v-0cd46298=""]');
    }

    modalCoverage() {
        return cy.get('p[data-testid="COVERAGE-value"]');
    }

    modalData() {
        return cy.get('p[data-testid="DATA-value"]');
    }

    modalValidity() {
        return cy.get('p[data-testid="VALIDITY-value"]');
    }

    modalPrice() {
        return cy.get('p[data-testid="PRICE-value"]');
    }
}

export default AiraloHomePage;
