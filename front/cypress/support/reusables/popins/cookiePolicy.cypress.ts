/// <reference types="Cypress" />

export function closeCookiePolicy() {
  it('clicks on cookie policy', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('.toast-close-button').click();
  });
}
