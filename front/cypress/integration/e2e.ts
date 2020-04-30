import { DEBUG_CONFIG } from '../config/debug.config';
import { CI_CONFIG } from '../config/ci.config';
import { cypress_login } from '../support/reusables/auth/cypress_login';
import { USER_CONFIG } from '../config/user.config';
import { cypress_signup } from '../support/reusables/auth/cypress_signup';
import { closeCookiePolicy } from '../support/reusables/popins/cookiePolicy.cypress';
import { cypress_logout } from '../support/reusables/auth/cypress_logout';
import { cypress_sendMessage } from '../support/reusables/chat/cypress_sendMessage';
import { cypress_contactUser } from '../support/reusables/search/cypress_contactUser';

// <reference types="Cypress" />

const isLocal = Cypress.env('ENV_NAME') && Cypress.env('ENV_NAME') === 'local';
const config = isLocal ? DEBUG_CONFIG.e2e : CI_CONFIG.e2e;

/*

  E2E requires users for registry, operator and territory :

  samuel@wecolearn.com / admin1234


 */

context('E2E', () => {
  const clear = Cypress.LocalStorage.clear;


  // @ts-ignore
  Cypress.LocalStorage.clear = function (keys, ls, rs) {
    // do something with the keys here
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
    whitelist: ['mercureAuthorization'],
  });


  before(() => {
    cy.clearCookie('mercureAuthorization');
    cy.clearLocalStorage('cookieseen');
  });

  closeCookiePolicy();

  if (config.signup) {
    describe('signup', () => {
      cypress_signup(USER_CONFIG);
      cypress_logout();
    });
  }

  if (config.signin) {
    describe('signin', () => {
      cypress_login(USER_CONFIG);
    });


    if (config.contactFirstMatch) {
      describe('contact first match', () => {
        cypress_contactUser(1);
      });
    }

    if (config.sendMessage) {
      describe('send message', () => {
        cypress_sendMessage();
      });
    }
  }
});
