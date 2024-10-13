describe('Airalo API Test', () => {
  let accessToken;
  let simIds = [];

  before(() => {
    // Load the fixture file with both API credentials and order details
    cy.fixture('apiData').then(apiData => {
      cy.wrap(apiData).as('apiData');
    });
  });

  beforeEach(function() {
    // Request for the access token only if it doesn't exist
    if (!accessToken) {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/v2/token`, 
        form: true,
        body: {
          client_id: this.apiData.client_id,
          client_secret: this.apiData.client_secret,
          grant_type: this.apiData.grant_type
        },
        headers: {
          Accept: 'application/json'
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('access_token');
        accessToken = response.body.data.access_token; 
      });
    }
  });

  it('Should place an order for 6 merhaba-7days-1gb eSIMs, store their IDs, and verify response matches the request', function() {
    expect(accessToken).to.exist; 

    // Use the order details from the fixture file
    const orderData = this.apiData.order;

    // Place the order for 6 eSIMs
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/v2/orders`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      form: true,
      body: orderData 
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');

      // Validate response data matches the request data
      const responseData = response.body.data;
      expect(responseData).to.include({
        quantity: orderData.quantity,
        package_id: orderData.package_id,
        type: orderData.type,
        description: orderData.description
      });

      // Check if exactly 6 SIMs are created
      const sims = responseData.sims;
      expect(sims).to.have.length(6);

      // Extract and store the IDs of each SIM
      simIds = sims.map(sim => {
        expect(sim).to.have.property('id');
        return sim.id;
      });

      // Ensure all 6 IDs are stored
      expect(simIds).to.have.length(6);
    });
  });

  it('Should retrieve SIMs from the /v2/sims endpoint and verify the SIM IDs', function() {
    expect(simIds).to.have.length(6); 

    // Call the /v2/sims endpoint to retrieve SIM information
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/v2/sims`, 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');

      // Extract the SIM IDs from the response data
      const returnedSimIds = response.body.data.map(sim => sim.id);

      // Check that all previously stored SIM IDs are present in the response
      simIds.forEach(id => {
        expect(returnedSimIds).to.include(id);
      });
    });
  });
});
