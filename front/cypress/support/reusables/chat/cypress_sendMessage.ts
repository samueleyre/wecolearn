
/// <reference types="Cypress" />

export function cypress_sendMessage() {
  it('send message', () => {
    cy.get('.ql-editor').type('Hi !').type('{enter}');
  });
}
