import { Injectable } from '@angular/core';
import { filter, pairwise, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { RETURN_URLS } from '~/config/navigation/returnUrls';
import { NAV } from '~/config/navigation/nav';
import { REDIRECT_URLS } from '~/config/navigation/redirectUrls';
import { HEADER_URLS } from '~/config/navigation/headerUrls';
import { HEADER_TITLE_URLS } from '~/config/navigation/headerTitleUrls';


@Injectable({
  providedIn: 'root',
})
export class MenuMobileService {
  static redirectedUrl: string = null;
  static beforeRedirectionUrl: string = null;
  static discussingUser: BehaviorSubject<string> = new BehaviorSubject(null);
  public showHeader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(router: Router) {
    // onload
    if (router.url) {
      this.setNavigation(router.url);
    }

    // on redirect
    router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.setNavigation(e.urlAfterRedirects);
        }
      });

    // hack to get url before redirection
    router.events
      .pipe(filter(e => e instanceof RoutesRecognized), pairwise())
      .subscribe((event: any[]) => {
        MenuMobileService.beforeRedirectionUrl = event[0].urlAfterRedirects;
        MenuMobileService.redirectedUrl = event[1].urlAfterRedirects;
      });
  }

  static showDiscussionUser(url: string) {
    return [/dashboard\/discussion\/current/].some(rx => new RegExp(rx).test(url));
  }

  static getReturnLink(url?: string) {
    // on page load
    if (url) {
      if (REDIRECT_URLS.returnUrls.chat.some(rx => new RegExp(rx).test(url))) {
        return NAV.discussion;
      }
      if (REDIRECT_URLS.returnUrls.profile.some(rx => new RegExp(rx).test(url))) {
        return NAV.profileSettings;
      }
      if (REDIRECT_URLS.returnUrls.search.some(rx => new RegExp(rx).test(url))) {
        return NAV.search;
      }
    }
    // on page redirect
    if (MenuMobileService.beforeRedirectionUrl && [NAV.discussion, NAV.search].indexOf(MenuMobileService.beforeRedirectionUrl) !== -1) {
      return MenuMobileService.beforeRedirectionUrl;
    }
    return NAV.search;
  }

  private setNavigation(path: string) {
    this.showHeader.next(this.urlHasHeader(path));
  }

  urlHasReturnButton(url: string) {
    return RETURN_URLS.some(rx => new RegExp(rx).test(url));
  }

  urlHasHeader(url: string) {
    return HEADER_URLS.some(rx => new RegExp(rx).test(url));
  }

  getUrlTitle(url: string): string | null {
    const val = Object.keys(HEADER_TITLE_URLS).find(rx => new RegExp(rx).test(url));
    return val ? HEADER_TITLE_URLS[val] : null;
  }
}
