/// <reference types="cypress" />

describe('login e2e', function () {
  beforeEach(function () {
    cy.fixture('users').then(users => {
      this.admin = users.admin
    })
  })

  it('should login successfully', function () {
    cy.visit('/')

    cy.findByLabelText(/email address/i).type(this.admin.email)
    cy.findByLabelText(/password/i).type(this.admin.password)
    cy.findByRole('button', {name: /send/i}).click()
    cy.findByText(/Dashboard/i).should('exist')
  })
})
