import { TestsInterface, TestsMobileInterface } from './tests.interface';

/**
 * continuous integration tests
 */
export const CI_CONFIG = {
  e2e: <TestsInterface>{
    signup: true,
    signin: true,
    contactFirstMatch: true,
    profile: true,
    search: true,
    sendMessage: true,
    community : {
      adminSignin: true,
      copyInviteLink: true,
      createAccountFromInviteLink: true,
    },
  },
  e2eMobile: <TestsMobileInterface>{
    signup: true,
    signin: true,
    contactFirstMatch: true,
    profile: true,
    search: true,
    sendMessage: true,
    community : {
      adminSignin: true,
      getLink_mobile: true,
      createAccountFromInviteLink: true,
    },
  },
};
