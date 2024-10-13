const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.airalo.com', // UI Base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: 'https://sandbox-partners-api.airalo.com' // API Base URL
  }
})
