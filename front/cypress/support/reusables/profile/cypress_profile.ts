import { User } from '~/core/entities/user/entity';

/// <reference types="Cypress" />
import { closeNotification } from '../popins/notification.cypress';

export function cypress_profile(currentProfile: User) {
  it('navigate to admin', () => {
    // cy.get('.Header-user').click();
    // cy.get('.mat-menu-item:nth-child(1)').click();
    // cy.wait(1000);
  });

  it('click on profile', () => {
    // cy.get('.mat-tab-link:nth-child(1)').click();
  });

  it('change values : firstname, lastname', () => {
    // cy.get('input.profile-firstname ')
    //   .clear()
    //   .type();
    // cy.get('input.profile-lastname ')
    //   .clear()
    //   .type(patchedProfile.lastname);
  });

  closeNotification();
}
