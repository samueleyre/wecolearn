/// <reference types="Cypress" />

export function cypress_searchByTag_mobile(tagName: string) {
  it('type in search bar', () => {
    cy.get('.SearchBar input').type(tagName).wait(1000);
  });
  it('choose first option', () => {
    cy.get('.tagAutocompleteItem').first().click();
  });
  it('remove choice', () => {
    cy.get('#resetBar').first().click();
  });
}
export function cypress_searchByTagDomain_mobile() {
  it('click on search bar', () => {
    cy.get('.SearchBar input').click().wait(1000);
  });
  it('choose first option', () => {
    cy.get('.tagDomains-box').first().click();
  });
  it('remove choice', () => {
    cy.get('#resetBar').first().click().wait(1000);
  });
}

