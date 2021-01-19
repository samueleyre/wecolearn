import { User } from '~/core/entities/user/entity';

/// <reference types="Cypress" />
export function cypress_profile(newProfileParameters: User) {
  it('navigate to profile', () => {
    cy.get('.nav-link').click();
    cy.get('.mat-menu-item').first().click();
    cy.wait(1000);
  });

  it('change firstname', () => {
    cy.get('#firstnameInput').clear({ force: true }).type(newProfileParameters.first_name).wait(1000);
  });

  it('change lastname', () => {
    cy.get('#lastnameInput').focus().wait(1000).clear().type(newProfileParameters.last_name);
  });

  it('remove & add Tag', () => {
    cy.get('#learnTagsFormContainer .tagsForm-remove').first().click();
    cy.get('#learnTagsFormContainer input').type(newProfileParameters.learn_tags[0]).wait(1000).type('{downArrow}').type('{enter}');
  });

  it('change bio', () => {
    cy.get('.biography textarea').clear().type(newProfileParameters.biographie);
  });
}
