import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

import { MenuService } from '~/core/services/layout/menu';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainComponent extends DestroyObservable implements OnInit {
  public showFooter = true;
  public showMobileHeader = true;
  public searchFocusState = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private footerMobileService: FooterMobileService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.footerMobileService.searchFocusState.asObservable().subscribe((value:boolean) => {
      this.searchFocusState = value;
    });

    this.initMobile();
  }

  private initMobile() {
    // onload
    if (this.router.url) {
      this.setNavigation(this.router.url);
    }

    // on redirect
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.setNavigation(e.url);
        }
      });
  }

  private setNavigation(path: string) {
    this.showFooter = MenuMobileService.showFooter(path);
    this.showMobileHeader = MenuMobileService.showHeader(path);
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
