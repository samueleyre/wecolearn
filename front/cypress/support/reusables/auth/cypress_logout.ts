import { closeNotification } from '../popins/notification.cypress';

export function cypress_logout() {
  it('clicks on logout', () => {
    cy.get('#parameters').click();
    cy.get('#signOutButton').click();
  });
  closeNotification();
}

export function cypress_logout_mobile() {
  it('clicks on logout', () => {
    cy.get('#profileTab').click();
    cy.get('#parametersLink').click();
    cy.get('#signOutButton').click();
  });
}
