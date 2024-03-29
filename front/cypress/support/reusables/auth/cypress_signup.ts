import {User} from '~/core/entities/user/entity';

export function cypress_signup(newUser: User) {

  it('add tag', () => {
    cy.get('.mat-chip-input').type(newUser.learn_tags[0]).wait(1000).type('{downArrow}').type('{enter}');
    cy.get('.mat-horizontal-stepper-content:nth-child(1) .Onboarding-nav-nextButton').click();
  });

  it('choose city', () => {
    cy.get('mat-radio-button:first-child').click();
    cy.get('.mat-horizontal-stepper-content:nth-child(2) .Onboarding-nav-nextButton').click();
  });

  it('add bio', () => {
    cy.get('textarea').type(newUser.biographie).type('{enter}');
    cy.get('.mat-horizontal-stepper-content:nth-child(3) .Onboarding-nav-nextButton').click();
  });

  it('credentials', () => {
    cy.get('#firstNameInput').type(newUser.first_name);
    cy.get('#lastNameInput').type(newUser.last_name);
    cy.get('#emailInput').type(newUser.email);
    cy.get('#passwordInput').type(newUser.password);
    cy.get('.mat-horizontal-stepper-content:nth-child(4) .Onboarding-nav-nextButton').click();
    cy.wait(3000);
  });
}

export function cypress_signup_mobile(newUser: User) {
  it('go to signup page', () => {
    cy.visit('/');
    cy.wait(2000); // prevent recurring bug
    cy.get('#signupButton').click();
  });

  it('add tag', () => {
    cy.get('.addTagButton').click();
    cy.get('.SearchBar input').type(newUser.learn_tags[0]).wait(1000);
    cy.get('.tagAutocompleteItem').first().click();
    // cy.get('.SearchBar #returnButton').click().wait(1000);
    cy.get('#next').click();
  });

  it('choose city', () => {
    cy.get('mat-radio-button:first-child label').click();
    cy.get('#next').click();
  });

  it('add bio', () => {
    cy.get('textarea').type('Je veux devenir danseur pro.').type('{enter}').blur();
    cy.get('#next').click();
  });

  it('credentials', () => {
    cy.get('#firstNameInput').type(newUser.first_name);
    cy.get('#lastNameInput').type(newUser.last_name);
    cy.get('#emailInput').type(newUser.email);
    cy.get('#passwordInput').type(newUser.password).blur();
    cy.get('#validate').click();
    cy.wait(6000);
  });
}
