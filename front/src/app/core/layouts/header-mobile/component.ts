import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';
import { WcRouterService } from '~/core/services/wc-router.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class HeaderMobileComponent extends DestroyObservable implements OnInit, OnDestroy {
  public connected = false;
  public showReturn = false;
  public showDiscussionUser = false;
  public returnLink: string;
  public showSettings = false;
  public title: string = null;
  public discussingUser$:Observable<string>;


  constructor(
    private router: Router,
    private menuMobileService: MenuMobileService,
    private _wcRouter: WcRouterService,
  ) {
    super();
  }

  ngOnInit() {
    this.initReturn();
    this.discussingUser$ = MenuMobileService.discussingUser.pipe(
      takeUntil(this.destroy$),
    );
  }

  get settingsLink() {
    return NAV.settings;
  }

  private initReturn() {
    // onload
    if (this.router.url) {
      this.setNavigation(this.router.url);
    }

    // on redirect
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.setNavigation(e.urlAfterRedirects);
        }
      });
  }

  setNavigation(path: string) {
    this.showReturn = this.menuMobileService.urlHasReturnButton(path);

    // get return link, if public profile page go te previous page
    this.returnLink = new RegExp(NAV.profilePublic).test(path) ?
      this._wcRouter.getReturnLink(NAV.search)
      : MenuMobileService.getReturnLink(path);

    this.showDiscussionUser = MenuMobileService.showDiscussionUser(path);
    this.showSettings = new RegExp(NAV.profileSettings).test(path);
    this.title = this.menuMobileService.getUrlTitle(path) ;
  }
}
