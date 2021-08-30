/// <reference types="cypress" />

describe('dashboard - list products', () => {
  beforeEach(() => {
    cy.task('db:delete:collections')
    cy.task('db:seed:user')
    cy.task('db:seed:products')
  })

  it('adds a new product', () => {
    const newProduct = {
      name: 'my new product',
      size: 1,
      description: 'test pass',
    }

    cy.login()
    cy.findByRole('button', {name: /add new/i}).click()

    cy.findByText(/add new product/i).should('exist')

    cy.findByLabelText(/name/i).type(newProduct.name)
    cy.findByLabelText(/size/i).type(newProduct.size)
    cy.findByLabelText(/description/i).type(newProduct.description)

    cy.findByRole('button', {name: /save/i}).click()

    cy.findByText(/product saved successfully/i).should('exist')

    cy.findByRole('button', {name: /cancel/i}).click()

    cy.findByText(newProduct.name).should('exist')
  })
})
