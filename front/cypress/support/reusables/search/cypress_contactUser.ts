
/// <reference types="Cypress" />

export function cypress_contactUser(index: number) {
  it('click on chat', () => {
    cy.get(`.SearchPage-cardsContainer-card:nth-child(${index}) open-thread`).click();
  });
}

export function cypress_contactUser_mobile(index: number) {
  it('click on chat', () => {
    cy.get(`.SearchPage-cardsContainer-card:nth-child(${index}) open-thread`).click();
  });
}
