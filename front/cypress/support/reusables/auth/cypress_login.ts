export function cypress_login(loginData: { email: string; password: string }) {
  it('go to login page', () => {
    cy.visit('/signin');
  });

  it('Log in', () => {
    cy.get('input[name="email"]').type(loginData.email);

    cy.get('input[name="password"]').type(loginData.password);

    cy.get('#signinButton').click();

    cy.wait(3000);
  });
}
