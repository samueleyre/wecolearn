import { NAV } from '~/config/navigation/nav';

export const DASHBOARD_FOOTER_URLS = [
  NAV.profileSettings,
  NAV.discussion,
  NAV.search,
];
export const MAIN_FOOTER_URLS = [
  NAV.aboutUs,
  NAV.mentionsLegales,
  NAV.cookiePolicy,
  NAV.manifest,
  NAV.peerLearning,
  NAV.notFound,
];

// no scroll on ioncontent
export const ION_CONTENT_NO_SCROLL_URLS = [
  NAV.search,
  NAV.currentDiscussion,
];
