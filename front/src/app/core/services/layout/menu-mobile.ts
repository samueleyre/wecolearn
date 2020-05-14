import { Injectable } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { RETURN_URLS } from '~/config/navigation/returnUrls';
import { FOOTER_URLS } from '~/config/navigation/footerUrls';
import { NAV } from '~/config/navigation/nav';
import { REDIRECT_URLS } from '~/config/navigation/redirectUrls';
import { User } from '~/core/entities/user/entity';
import {HEADER_URLS} from "~/config/navigation/headerUrls";


@Injectable({
  providedIn: 'root',
})
export class MenuMobileService {
  static redirectedUrl: string = null;
  static beforeRedirectionUrl: string = null;

  static discussingUser: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(router: Router) {
    // hack to get url before redirection
    router.events
      .pipe(filter(e => e instanceof RoutesRecognized), pairwise())
      .subscribe((event: any[]) => {
        MenuMobileService.beforeRedirectionUrl = event[0].urlAfterRedirects;
        MenuMobileService.redirectedUrl = event[1].urlAfterRedirects;
      });
  }


  static showFooter(url: string) {
    return FOOTER_URLS.indexOf(url) !== -1;
  }

  static showHeader(url: string) {
    return HEADER_URLS.some(rx => rx.test(url));
  }

  static showDiscussionUser(url: string) {
    return [/dashboard\/discussion\/current/].some(rx => rx.test(url));
  }

  static getReturnLink(url?: string) {
    // on page load
    if (url) {
      if (REDIRECT_URLS.returnUrls.chat.some(rx => rx.test(url))) {
        return NAV.discussion;
      }
      if (REDIRECT_URLS.returnUrls.profile.some(rx => rx.test(url))) {
        return NAV.profile;
      }
      if (REDIRECT_URLS.returnUrls.search.some(rx => rx.test(url))) {
        return NAV.search;
      }
    }
    // on page redirect
    if (MenuMobileService.beforeRedirectionUrl && [NAV.discussion, NAV.search].indexOf(MenuMobileService.beforeRedirectionUrl) !== -1) {
      return MenuMobileService.beforeRedirectionUrl;
    }
    return NAV.search;
  }
  showReturn(url: string) {
    return RETURN_URLS.some(rx => rx.test(url));
  }
}
