
export function cypress_signup(loginData: { email: string; password: string }) {

  it('go to signup page', () => {
    cy.visit('/signup');
  });

  it('choose city', () => {
    // cy.get('.Login mat-form-field:first-child input').type(loginData.email);
    //
    // cy.get('.Login mat-form-field:nth-child(2) input').type(loginData.password);
    //
    // cy.get('.Login form > button').click();
    //
    // cy.wait(1000);
  });
}
