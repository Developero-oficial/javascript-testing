/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const axios = require('axios')
require('dotenv').config()

const users = require('../fixtures/users.json')
const productsData = require('../fixtures/products.json')

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  config.env.backendApi = apiBaseUrl

  on('task', {
    async 'db:seed:user'() {
      const response = await axios.post(`${apiBaseUrl}/seed`, {
        schema: 'users',
        collectionData: [users.admin],
      })

      return response.data
    },
    async 'db:seed:products'() {
      const response = await axios.post(`${apiBaseUrl}/seed`, {
        schema: 'products',
        collectionData: productsData.products,
      })

      return response.data
    },
    async 'db:delete:collections'() {
      const response = await axios.delete(`${apiBaseUrl}/collections`)
      return response.data
    },
  })

  return config
}
