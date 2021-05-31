export interface TestsInterface {
  signup: boolean;
  signin: boolean;
  contactFirstMatch: boolean;
  profile: boolean;
  search: boolean;
  sendMessage: boolean;
  community: {
    adminSignin: boolean;
    copyInviteLink: boolean;
    createAccountFromInviteLink: boolean;
  };

}
export interface TestsMobileInterface {
  signup: boolean;
  signin: boolean;
  contactFirstMatch: boolean;
  profile: boolean;
  search: boolean;
  sendMessage: boolean;
  community: {
    adminSignin: boolean;
    getLink_mobile: boolean;
    createAccountFromInviteLink: boolean;
  };
}
