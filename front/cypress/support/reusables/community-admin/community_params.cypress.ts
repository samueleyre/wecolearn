import * as _ from 'lodash';

import { ENDPOINTS } from '~/config/api/end-points.const';
import { NAV } from '~/config/navigation/nav';

/// <reference types="Cypress" />
import { environment } from '../../../../src/environments/environment';

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

export function cypress_community_admin_getLinkFromApi() {
  it('login in as admin & call api community and get link', () => {
    cy.request({
      url: `${environment.origin}${ENDPOINTS.auth.signIn}`,
      method: 'POST',
      body: {
        email: 'samuel+2@wecolearn.com',
        password: 'admin1234',
      },
    }).then((authResponse) => {
      const authToken = _.find(authResponse, 'token')['token'];
      cy.request({
        url: `${environment.origin}${ENDPOINTS.communityAdmin.community}`,
        headers: {
          authorization: `bearer ${authToken}`,
        },
      }).then((response) => {
        const token = response.body.invite_token.token;
        const link = `${environment.publique}${NAV.signup}${token}`;
        cy.visit(link);
      });
    });
  });
}

