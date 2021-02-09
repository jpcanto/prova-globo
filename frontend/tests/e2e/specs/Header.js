describe('Header suit', () => {
  it('Check toggle create user modal', () => {
    cy.visit('/');

    cy.contains('button', 'INCLUIR USUÁRIO').should('be.visible');
    cy.get('.v-dialog').should('not.exist');

    cy.contains('button', 'INCLUIR USUÁRIO').click();
    cy.get('.v-dialog').should('be.exist');

    cy.contains('button', 'Cancelar').click();
    cy.get('.v-dialog').should('not.exist');
  });

  it('Check toggle filter modal', () => {
    cy.visit('/');

    cy.get('header button .mdi-tune').should('be.visible');
    cy.get('.v-navigation-drawer').should('not.visible');

    cy.get('header button .mdi-tune').click();
    cy.get('.v-navigation-drawer').should('be.visible');

    cy.contains('button', 'X').click();
    cy.get('.v-navigation-drawer').should('not.visible');
  });

  it('validate create user', () => {
    cy.visit('/');

    cy.contains('button', 'INCLUIR USUÁRIO').click();
    cy.get('.v-dialog .name-input').type('{selectall}{backspace}Teste Cypress');
    cy.get('.v-dialog .email-input').type('{selectall}{backspace}Teste_Cypress@teste.com.br');
    cy.get('.v-dialog .rules-input').type('02');

    cy.get('[data-cy=status-input]')
      .parent()
      .click();
    cy.get('.v-menu__content')
      .contains('INATIVO')
      .click();

    cy.contains('Salvar').click();
    cy.contains('Usuário criado com sucesso').should('be.exist');
  });
});
