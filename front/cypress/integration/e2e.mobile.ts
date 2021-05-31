import { User } from '~/core/entities/user/entity';

// <reference types="Cypress" />
import { DEBUG_CONFIG } from '../config/debug.config';
import { CI_CONFIG } from '../config/ci.config';
import { cypress_login } from '../support/reusables/auth/cypress_login';
import { NEW_COMMUNITY_USER_CONFIG, USER_CONFIG } from '../config/user.config';
import { cypress_signup_mobile } from '../support/reusables/auth/cypress_signup';
import { cypress_logout_mobile } from '../support/reusables/auth/cypress_logout';
import { cypress_sendMessage_mobile } from '../support/reusables/chat/cypress_sendMessage';
import { cypress_contactUser_mobile } from '../support/reusables/search/cypress_contactUser';
import { cypress_navToSearchTab_mobile } from '../support/reusables/nav/nav.cypress';
import { cypress_searchByTag_mobile, cypress_searchByTagDomain_mobile } from '../support/reusables/search/cypress_search';
import {
  cypress_community_admin_getLinkFromApi,
} from '../support/reusables/community-admin/community_params.cypress';


const isLocal = Cypress.env('ENV_NAME') && Cypress.env('ENV_NAME') === 'local';
const config = isLocal ? DEBUG_CONFIG.e2eMobile : CI_CONFIG.e2eMobile;

/*

 load fixtures before running tests

 */

context('E2E - mobile', () => {
  Cypress.on('window:before:load', (win) => {
    win.indexedDB.deleteDatabase('ngStorage');
  });
  Cypress.Cookies.defaults({
    whitelist: ['mercureAuthorization'],
  });

  before(() => {
    // tslint:disable-next-line:no-magic-numbers
    cy.clearCookie('mercureAuthorization');
  });

  beforeEach(() => {
    cy.viewport(375, 667);
  });

  const user = {
    ...USER_CONFIG,
    email: `contact+mobile-${new Date().toLocaleDateString()}@wecolearn.com`,
  };

  if (config.signup) {
    describe('signup', () => {
      cypress_signup_mobile(user);
      cypress_logout_mobile();
    });
  }

  if (config.signin) {
    describe('signin', () => {
      cypress_login(user);
    });

    // search
    if (config.search) {
      describe('search for polka', () => {
        cypress_searchByTag_mobile('polka');
      });
      describe('search for Dance ( domain )', () => {
        cypress_searchByTagDomain_mobile();
      });
    }

    if (config.contactFirstMatch) {
      describe('contact first match', () => {
        cypress_navToSearchTab_mobile();
        cypress_contactUser_mobile(1);
      });
    }

    if (config.sendMessage) {
      describe('send message', () => {
        cypress_sendMessage_mobile();
      });
    }
  }

  if (config.community) {
    if (config.community.getLink_mobile) {
      describe('get & go to link from api', () => {
        cypress_community_admin_getLinkFromApi();
      });
    }
    const newCommunityUser = <User>{
      ...NEW_COMMUNITY_USER_CONFIG,
      email: `contact+communitymobile1-${new Date().toLocaleDateString()}@wecolearn.com`,
    };
    if (config.community.createAccountFromInviteLink) {
      describe('create account from invite link', () => {
        cypress_signup_mobile(newCommunityUser);
      });
    }
  }
});
