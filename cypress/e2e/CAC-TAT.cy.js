
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
      cy.get('.button[type="submit"]').click()

      cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('jmano99hotmailcom')
      cy.get('#open-text-area').type('Fornecendo informações')
      cy.get('.button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando um vlor não numerio é informado', ()=> {
      cy.get('#phone').type('abcde').should('have.value','')
    })



    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Manoel')
      cy.get('#email').type('j_mano@99hotmail.com')
      cy.get('#open-text-area').type('Fornecendo informações')
      cy.get('[for="phone-checkbox"]').click()
      cy.get('.button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
      cy.get('#firstName').type('João').should('have.value', 'João')
      cy.get('#firstName').clear().should('have.value', '')
      cy.get('#lastName').type('Manoel').should('have.value', 'Manoel')
      cy.get('#lastName').clear().should('have.value', '')
      cy.get('#email').type('J_mano99@hotmail.com').should('have.value', 'J_mano99@hotmail.com')
      cy.get('#email').clear().should('have.value', '')
      cy.get('#phone').type('47997213459').should('have.value','47997213459')
      cy.get('#phone').clear().should('have.value','')
      cy.get('.button[type="submit"]').click()

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

})

