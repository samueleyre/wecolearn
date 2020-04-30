
/// <reference types="Cypress" />

export function cypress_contactUser(index: number) {
  it('navigate to search', () => {
    cy.get(`.SearchPage-cardsContainer-card:nth-child(${index}) open-thread`).click();
   });
}
