import { TestsInterface } from './tests.interface';

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
  },
};
