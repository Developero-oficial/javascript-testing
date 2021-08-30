/// <reference types="cypress" />

describe('dashboard - list products', () => {
  beforeEach(() => {
    cy.task('db:delete:collections')
    cy.task('db:seed:user')
    cy.task('db:seed:products')
  })

  it('displays a list of products when there is data', () => {
    cy.login()

    cy.findByText(/test 1/i).should('exist')
    cy.findByText(/product 1/i).should('exist')
  })
})
