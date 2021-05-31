/**
 * local debug tests
 */
import {TestsInterface, TestsMobileInterface} from './tests.interface';

/**
 * Do not commit boolean changes to this file, to avoid conflicts
 */
export const DEBUG_CONFIG = {
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
