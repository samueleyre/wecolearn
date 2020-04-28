import { closeNotification } from '../popins/notification.cypress';

export function cypress_logout() {
  it('clicks on logout', () => {
    cy.get('#parameters').click();
    cy.get('#signOutAction').click();
  });
  closeNotification();
}
