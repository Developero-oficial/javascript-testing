describe('bmi calculator', () => {
  it('calculate Thiness result', () => {
    cy.visit('/')

    cy.findByLabelText('Weight (KG)').type('50')
    cy.findByLabelText('Height (M)').type('1.8')

    cy.get('button').click()

    cy.findByText(/bmi: 15.432/i).should('be.visible')
    cy.findByText(/bmi estimation: thiness/i).should('be.visible')
  })
})
