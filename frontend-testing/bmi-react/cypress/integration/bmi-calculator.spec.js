describe('bmi calculator', () => {
  it('calculate Thiness result', () => {
    cy.visit('/')

    cy.findByLabelText('Weight (KG)').type('50')
    cy.findByLabelText('Height (M)').type('1.8')

    cy.get('button').click()

    cy.findByText(/bmi: 15.432/i).should('be.visible')
    cy.findByText(/bmi estimation: thiness/i).should('be.visible')
  })

  it('calculate Normal result', () => {
    cy.visit('/')

    cy.findByLabelText('Weight (KG)').type('80')
    cy.findByLabelText('Height (M)').type('1.8')

    cy.get('button').click()

    cy.findByText(/bmi: 24.691/i).should('be.visible')
    cy.findByText(/bmi estimation: normal/i).should('be.visible')
  })

  it('calculate Overweight result', () => {
    cy.visit('/')

    cy.findByLabelText('Weight (KG)').type('90')
    cy.findByLabelText('Height (M)').type('1.8')

    cy.get('button').click()

    cy.findByText(/bmi: 27.778/i).should('be.visible')
    cy.findByText(/bmi estimation: overweight/i).should('be.visible')
  })

  it('calculate Obese result', () => {
    cy.visit('/')

    cy.findByLabelText('Weight (KG)').type('100')
    cy.findByLabelText('Height (M)').type('1.8')

    cy.get('button').click()

    cy.findByText(/bmi: 30.864/i).should('be.visible')
    cy.findByText(/bmi estimation: obese/i).should('be.visible')
  })
})
