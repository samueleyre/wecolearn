/**
 * local debug tests
 */
import { TestsInterface } from './tests.interface';

/**
 * Do not commit boolean changes to this file, to avoid conflicts
 */
export const DEBUG_CONFIG = {
  e2e: <TestsInterface>{
    signup: false,
    signin: false,
    contactFirstMatch: false,
    profile: false,
    search: false,
    sendMessage: false,
    community : {
      adminSignin: true,
      copyInviteLink: true,
      createAccountFromInviteLink: true,
    },
  },
};
