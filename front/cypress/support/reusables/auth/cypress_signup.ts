
export function cypress_signup(newUser: { first_name: string, last_name: string, email: string; password: string }) {
  it('go to signup page', () => {
    cy.visit('/');
    cy.get('#signupButton').click();
  });

  it('choose city', () => {
    cy.get('mat-radio-button:first-child').click();
    cy.get('#cityStep .btn-primary').click();
  });

  it('add tag', () => {
    cy.get('.mat-chip-input').type('polka').wait(1000).type('{downArrow}').type('{enter}');
    cy.get('#learningStep .btn-primary').click();
  });

  it('add bio', () => {
    cy.get('textarea').type('Je veux devenir danseur pro.').type('{enter}');
    cy.get('#projectStep .btn-primary').click();
  });

  it('credentials', () => {
    cy.get('#firstNameInput').type(newUser.first_name);
    cy.get('#lastNameInput').type(newUser.last_name);
    cy.get('#emailInput').type(newUser.email);
    cy.get('#passwordInput').type(newUser.password);
    cy.get('#idStep .btn-primary').click();
    cy.wait(3000);
  });
}

export function cypress_signup_mobile(newUser: { first_name: string, last_name: string, email: string; password: string }) {
  it('go to signup page', () => {
    cy.visit('/');
    cy.get('#signupButton').click();
  });

  it('choose city', () => {
    cy.get('mat-radio-button:first-child').click();
    cy.get('#next').click();
  });

  it('add tag', () => {
    cy.get('.mat-chip-input').type('polka').wait(1000).type('{downArrow}').type('{enter}').blur();
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
    cy.get('#passwordInput').type(newUser.password);
    cy.get('#validate').click();
    cy.wait(3000);
  });
}
