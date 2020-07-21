import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'dash-header-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class HeaderMobileComponent extends DestroyObservable implements OnInit, OnDestroy {
  public connected = false;
  public showReturn = false;
  public showDiscussionUser = false;
  public returnLink: string;
  public showSettings = false;
  public discussingUser$:Observable<string>;


  constructor(
    private router: Router,
    private menuMobileService: MenuMobileService,
  ) {
    super();
  }

  ngOnInit() {
    this.initReturn();
    this.discussingUser$ = MenuMobileService.discussingUser.pipe(
      takeUntil(this.destroy$),
    );
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
    this.showReturn = this.menuMobileService.showReturn(path);
    this.returnLink = MenuMobileService.getReturnLink(path);
    this.showDiscussionUser = MenuMobileService.showDiscussionUser(path);
    this.showSettings = path === NAV.profile;
  }
}
