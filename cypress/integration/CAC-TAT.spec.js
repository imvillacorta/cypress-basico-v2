/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

        cy.get('#firstName').type('Ivan')
        cy.get('#lastName').type('Villacorta')
        cy.get('#email').type('ivan_teste@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Ivan')
        cy.get('#lastName').type('Villacorta')
        cy.get('#email').type('ivan_testeteste.com')
        cy.get('#open-text-area').type('Teste de texto de ajuda')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Deve permanecer com o input de telefone vazio caso valor seja diferente de número', function(){
        cy.get('#phone')
        .type('aaaa')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Ivan')
        cy.get('#lastName').type('Villacorta')
        cy.get('#email').type('ivan_teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste de texto de ajuda')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Ivan')
        .should('have.value', 'Ivan')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Villacorta')
        .should('have.value', 'Villacorta')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('ivan@teste.com')
        .should('have.value', 'ivan@teste.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('999999999')
        .should('have.value', '999999999')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto por seu valor', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto pelo indice', function(){
        cy.get('#product')
        .select(3)
        .should('have.value', 'mentoria')
    })

    it('Marca o tipo de atendimento', function(){    
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')   
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio)
            .should('be.checked')
        }) 
    }) 
    
    it('Marcar contato preferencial e descarmar o ultimo checkbox', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })  

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })  

    it('Seleciona um arquivo simulando drag and drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', 
            {
                action: 'drag-drop'
            })
        .should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    }) 
    
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    }) 

    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', 'privacy.html')
    })

    it('Acessa a página de politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    }) 


  })