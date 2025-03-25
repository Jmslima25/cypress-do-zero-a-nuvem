Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'MrJohn',
    lastName: 'Lambozio',
    email:'Lamb@yahoo.com.br',
    text: 'Teste.'
}) => {
      cy.get('#firstName').type(data.firstName)
      cy.get('#lastName').type(data.lastName)
      cy.get('#email').type(data.email)
      cy.get('#open-text-area').type( data.text)
      cy.contains('button', 'Enviar').click()
})