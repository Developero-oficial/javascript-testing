/// <reference types="cypress" />

describe('dashboard - list products', () => {
  beforeEach(() => {
    cy.task('db:delete:collections')
    cy.task('db:seed:user')
  })

  it('displays a list of products when there is data', () => {
    cy.login()
  })
})
