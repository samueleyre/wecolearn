import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeWhile } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

import { MenuService } from '~/core/services/layout/menu';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainComponent implements OnInit {
  public activated: boolean;
  showFooter = true;
  private alive = true;
  searchFocusState = false;

  constructor(
    private menuService: MenuService,
    private deviceService: DeviceDetectorService,
    private footerMobileService: FooterMobileService,
    private router: Router,
  ) {
    //
  }

  ngOnInit() {
    this.footerMobileService.searchFocusState.asObservable().subscribe((value:boolean) => {
      this.searchFocusState = value;
    });
    this.menuService.get().subscribe((on) => {
      this.activated = on;
    });
    this.initFooter();

    setTimeout(
      () => {
        const el = document.getElementsByClassName('crisp-client')[0];
        if (el) {
          el['style']['display'] = 'none';
        }
      },
      500); // tslint:disable-line no-magic-numbers
  }

  private initFooter() {
    // onload
    if (this.router.url) {
      this.showFooter = MenuMobileService.showFooter(this.router.url);
    } else {
      console.log('Current route not found');
    }

    // on redirect
    this.router.events
      .pipe(takeWhile(() => this.alive))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.showFooter = MenuMobileService.showFooter(e.url);
        }
      });
  }


  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
