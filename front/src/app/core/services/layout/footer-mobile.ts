import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { DASHBOARD_FOOTER_URLS, ION_CONTENT_NO_SCROLL_URLS, MAIN_FOOTER_URLS } from '~/config/navigation/footerUrls';
import { NAV } from '~/config/navigation/nav';


@Injectable({
  providedIn: 'root',
})
export class FooterMobileService {
  inputFocusState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showFooter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showOnboardingFooter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showMainFooter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  disableScrollingOnIonContent: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(router: Router) {
    // onload
    if (router.url) {
      this.setChanges(router.url);
    }

    // on redirect
    router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.setChanges(e.urlAfterRedirects);
        }
      });
  }

  private setChanges(path: string) {
    this.showFooter.next(this.urlHasDashboardFooter(path));
    this.showOnboardingFooter.next(
      NAV.signup.indexOf(path) !== -1,
    );
    this.showMainFooter.next(this.urlHasMainFooter(path));
    this.disableScrollingOnIonContent.next(this.urlHasNoScroll(path));
  }

  urlHasDashboardFooter(url: string): boolean {
    return DASHBOARD_FOOTER_URLS.indexOf(url) !== -1;
  }

  urlHasMainFooter(url: string): boolean {
    return MAIN_FOOTER_URLS.indexOf(url) !== -1;
  }

  urlHasNoScroll(url: string): boolean {
    return ION_CONTENT_NO_SCROLL_URLS.indexOf(url) !== -1;
  }
}
