import { User } from '~/core/entities/user/entity';

// <reference types="Cypress" />
import { DEBUG_CONFIG } from '../config/debug.config';
import { CI_CONFIG } from '../config/ci.config';
import { cypress_login } from '../support/reusables/auth/cypress_login';
import { NEW_COMMUNITY_USER_CONFIG, USER_CHANGES_CONFIG, USER_CONFIG } from '../config/user.config';
import { cypress_signup } from '../support/reusables/auth/cypress_signup';
import { closeCookiePolicy } from '../support/reusables/popins/cookiePolicy.cypress';
import { cypress_logout } from '../support/reusables/auth/cypress_logout';
import { cypress_sendMessage } from '../support/reusables/chat/cypress_sendMessage';
import { cypress_contactUser } from '../support/reusables/search/cypress_contactUser';
import { cypress_profile } from '../support/reusables/profile/cypress_profile';
import { cypress_community_admin_copyInviteLinkAndGoToIt } from '../support/reusables/community-admin/community_params.cypress';


const isLocal = Cypress.env('ENV_NAME') && Cypress.env('ENV_NAME') === 'local';
const config = isLocal ? DEBUG_CONFIG.e2e : CI_CONFIG.e2e;

/*

 load fixtures before running tests

 */

context('E2E', () => {
  const clear = Cypress.LocalStorage.clear;


  // @ts-ignore
  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    if (keys.length === 0) {
      if (!localStorage.getItem('cookieseen')) {
        // tslint:disable-next-line:no-invalid-this
        return clear.apply(this);
      }
    } else {
      // tslint:disable-next-line:no-invalid-this
      return clear.apply(this, [keys, ls, rs]);
    }
  };

  Cypress.on('window:before:load', (win) => {
    win.indexedDB.deleteDatabase('ngStorage');
  });
  Cypress.Cookies.defaults({
    whitelist: ['mercureAuthorization', 'Authorization'],
  });


  before(() => {
    cy.clearCookie('mercureAuthorization');
    cy.clearLocalStorage('cookieseen');
  });

  closeCookiePolicy();

  const user = {
    ...USER_CONFIG,
    email: `contact+${new Date().toLocaleDateString()}@wecolearn.com`,
  };

  const userChanges = USER_CHANGES_CONFIG;

  // a user creates a account and then logs out
  if (config.signup) {
    describe('signup', () => {
      it('go to signup page', () => {
        cy.visit('/');
        cy.wait(2000); // prevent recurring bug
        cy.get('#signupButton').click();
      });
      cypress_signup(user);
      cypress_logout();
    });
  }

  // he signs in
  if (config.signin) {
    describe('signin', () => {
      cypress_login(user);
    });

    // he does changes on his profile
    if (config.profile) {
      describe('profile', () => {
        cypress_profile(userChanges);
      });
    }

    // he goes to the search page and clicks on the first match
    if (config.contactFirstMatch) {
      describe('contact first match', () => {
        cypress_contactUser(1);
      });
    }

    // he sends a message to the first match
    if (config.sendMessage) {
      describe('send message', () => {
        cypress_sendMessage();
      });
    }
  }

  // admin of first community logged in
  if (config.community) {
    if (config.community.adminSignin) {
      describe('community admin signin', () => {
        cypress_login(
          {
            email: 'samuel+2@wecolearn.com',
            password: 'admin1234',
          },
        );
      });
    }
    if (config.community.copyInviteLink) {
      describe('copy invite link and go to invite link', () => {
        cypress_community_admin_copyInviteLinkAndGoToIt();
      });
    }
    const newCommunityUser = <User>{
      ...NEW_COMMUNITY_USER_CONFIG,
      email: `contact+community1-${new Date().toLocaleDateString()}@wecolearn.com`,
    };
    if (config.community.createAccountFromInviteLink) {
      describe('create account from invite link', () => {
        cypress_signup(newCommunityUser);
      });
    }
  }
});
