describe('Header suit', () => {
  it('Check toggle create user modal', () => {
    cy.visit('/');

    cy.contains('button', 'INCLUIR USUÁRIO').should('be.visible');
    cy.get('.v-dialog').should('not.exist');

    cy.contains('button', 'INCLUIR USUÁRIO').click();
    cy.get('.v-dialog').should('be.exist');
  });

  it('Check toggle filter modal', () => {
    cy.visit('/');

    cy.get('header button .mdi-tune').should('be.visible');
    cy.get('.v-navigation-drawer').should('not.visible');

    cy.get('header button .mdi-tune').click();
    cy.get('.v-navigation-drawer').should('be.visible');
  });
});
