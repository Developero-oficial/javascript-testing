/// <reference types="cypress" />

describe('login e2e', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000')

    cy.findByLabelText(/email address/i).type('john.doe@mail.com')
    cy.findByLabelText(/password/i).type('123456')
    cy.findByRole('button', {name: /send/i}).click()
    cy.findByText(/Dashboard/i).should('exist')
  })
})
