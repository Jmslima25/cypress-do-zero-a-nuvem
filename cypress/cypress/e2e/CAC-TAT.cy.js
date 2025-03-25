
  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {//Aqui vai um comando que é sempre executado antes dos outros. Preparação do ambiente
      cy.visit('./src/index.html')
    });

    it('verifica o título da aplicação', () => {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('J_mano99@hotmail.com')
      cy.get('#open-text-area').type('Fornecendo informações para o teste do cypress do curso tat especial exercicio extra 1', {delay:0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('jmano99hotmailcom')
      cy.get('#open-text-area').type('Fornecendo informações')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando um valor não numerio é informado', ()=> {
      cy.get('#phone').type('abcde').should('have.value','')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('j_mano@99hotmail.com')
      cy.get('#open-text-area').type('Fornecendo informações')
      cy.get('[for="phone-checkbox"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> { //exercicio 5
      cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '')
      cy.get('#lastName').type('Manoel').should('have.value', 'Manoel').clear().should('have.value', '')
      cy.get('#email').type('J_mano99@hotmail.com').should('have.value', 'J_mano99@hotmail.com').clear().should('have.value', '')
      cy.get('#phone').type('47997213459').should('have.value','47997213459').clear().should('have.value','')
      cy.get('.button[type="submit"]').click()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> { //exercicio 6
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', ()=> { //exercicio 7 
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', ()=> { //exercicio 8 
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    // Selecionando opções em campos de seleção suspensa

    it('seleciona um produto (YouTube) por seu texto', ()=> { //exercicio inicial .select
      cy.get('#product').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', ()=> { //exercicio extra 1
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', ()=> { //exercicio extra 2
      cy.get('#product').select(1).should('have.value', 'blog')
    })

    // Selecionando radiop button
    it('marca o tipo de atendimento "Feedback"', ()=>{
      cy.get('input[type="radio"][value="feedback"').check().should('be.checked')
    })
    
    it('marca cada tipo de atendimento', ()=>{
      cy.get('input[type="radio"][value="feedback"').check().should('be.checked')
      cy.get('input[type="radio"][value="elogio"').check().should('be.checked')
      cy.get('input[type="radio"][value="ajuda"').check().should('be.checked')
    })
    
    it('marca cada tipo de atendimento versão 2', ()=>{
      cy.get('input[type="radio')
      .each(type0fatendimento =>{
        cy.wrap(type0fatendimento).check().should('be.checked')
      })
    })
    
    //marcando e desmarcando inputs tipo checkbox
    
    it('marca ambos checkboxes, depois desmarca o último', ()=>{
       cy.get('input[type="checkbox"]').check().should('be.checked')
       .last().uncheck().should('be.not.checked')
    
       
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário modo 2', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('j_mano@99hotmail.com')
      cy.get('#open-text-area').type('Fornecendo informações')
      cy.get('input[type="checkbox"]').last().check()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

     // Fazendo upload de arquivos com Cypress

     it('seleciona um arquivo da pasta fixtures', () => {
      
      cy.get('#file-upload').selectFile('C:/Users/j_man/OneDrive/Documentos/Visual Studio/cypress/cypress/fixtures/example.json')
      .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
      })
     })


     it('seleciona um arquivo simulando um drag-and-drop', () => {
      
      cy.get('#file-upload').selectFile('C:/Users/j_man/OneDrive/Documentos/Visual Studio/cypress/cypress/fixtures/example.json', {action:'drag-drop'})
      .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
      })
     })

     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('samplefile')
      cy.get('#file-upload').selectFile('@samplefile')
      .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
      })
     })

    // Links externos

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
      cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
    })
    
      // Exercicio extra 1
    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
       cy.contains('a', 'Política de Privacidade')
       cy.get('a').invoke('removeAttr', 'target').click() // Retiro o target e abro as politicas na mesma pagina.

       cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

   //Simulando as dimensões de um dispositivo movel

})

