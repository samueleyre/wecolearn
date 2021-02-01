import { NAV } from '~/config/navigation/nav';

export const REDIRECT_URLS = {
  returnUrls : {
    profile : [
      NAV.settings,
    ],
    chat : [
      NAV.discussion,
    ],
    search : [
      'dashboard/profile/',
    ],
  },
};
