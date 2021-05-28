describe('bmi calculator', () => {
  it('calculate Thiness result', () => {
    cy.visit('http://localhost:3000')

    cy.get('#weight').type('50')
    cy.get('#height').type('1.8')

    cy.get('button').click()

    cy.get('.App > :nth-child(2)').should('have.text', 'BMI: 15.432')
    cy.get('.App > :nth-child(3)').should(
      'have.text',
      'BMI Estimation: Thiness',
    )
  })
})
