/**
 * local debug tests
 */
import { TestsInterface } from './tests.interface';

/**
 * Do not commit boolean changes to this file, to avoid conflicts
 */
export const DEBUG_CONFIG = {
  e2e: <TestsInterface>{
    signup: true,
    signin: true,
    contactFirstMatch: true,
    sendMessage: true,
  },
};
