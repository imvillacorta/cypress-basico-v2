Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Ivan')
    cy.get('#lastName').type('Villacorta')
    cy.get('#email').type('ivan_teste@teste.com')
    cy.get('#open-text-area').type('Texto descrição de ajuda')
    cy.contains('button', 'Enviar').click()
})