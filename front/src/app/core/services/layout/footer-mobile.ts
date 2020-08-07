import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { FOOTER_URLS } from '~/config/navigation/footerUrls';


@Injectable({
  providedIn: 'root',
})
export class FooterMobileService {
  inputFocusState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showFooter: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(router: Router) {
    // onload
    if (router.url) {
      this.setNavigation(router.url);
    }

    // on redirect
    router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.setNavigation(e.url);
        }
      });
  }

  private setNavigation(path: string) {
    this.showFooter.next(this.urlHasFooter(path));
  }

  urlHasFooter(url: string): boolean {
    return FOOTER_URLS.indexOf(url) !== -1;
  }
}
