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
  showFooter = true;
  searchFocusState = false;

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

    this.initFooter();
  }

  // ---- MOBILE -----
  private initFooter() {
    // onload
    if (this.router.url) {
      this.showFooter = MenuMobileService.showFooter(this.router.url);
    } else {
      console.log('Current route not found');
    }

    // on redirect
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.showFooter = MenuMobileService.showFooter(e.url);
        }
      });
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
