
/// <reference types="Cypress" />

export function cypress_navToSearchTab_mobile() {
  it('go to search tab', () => {
    cy.get(`#searchTab`).click();
  });
}
