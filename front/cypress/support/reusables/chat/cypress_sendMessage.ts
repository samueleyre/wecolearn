
/// <reference types="Cypress" />

export function cypress_sendMessage() {
  it('send message', () => {
    cy.get('.ql-editor').type('Hi !').type('{enter}');
  });
}

export function cypress_sendMessage_mobile() {
  it('send message', () => {
    cy.get('.ql-editor').type('Hi !').type('{enter}');
    cy.get('#envoyer').click();
  });
}
