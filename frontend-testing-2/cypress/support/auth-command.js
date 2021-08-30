Cypress.Commands.add('login', () => {
  cy.fixture('users').then(({admin: {email, password}}) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendApi')}/login`,
      body: {
        email,
        password,
      },
    }).then(resp => {
      window.localStorage.setItem('@token', resp.body.token)
      cy.visit('/')
    })
  })
})
