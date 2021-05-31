/// <reference types="Cypress" />

export function cypress_community_admin_copyInviteLinkAndGoToIt() {
  it('goes to community admin settings page', () => {
    cy.get(`#communityAdminSettingsNavButton`).click();
  });
  it('copies invite link then goes to it', () => {
    cy.get('#communityLinkInput').invoke('val')
      .then((link: string) => {
        cy.visit(link);
      });
  });

}

