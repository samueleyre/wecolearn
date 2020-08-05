import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';

@Component({
  selector: 'app-layout',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainComponent extends DestroyObservable implements OnInit {
  public showMobileFooter: Observable<boolean>;
  public showMobileHeader: Observable<boolean>;

  constructor(
    private deviceService: DeviceDetectorService,
    public footerMobileService: FooterMobileService,
    public menuMobileService: MenuMobileService,
  ) {
    super();
  }

  ngOnInit() {
    this.showMobileFooter = combineLatest([
        this.footerMobileService.inputFocusState.asObservable(),
        this.footerMobileService.showFooter.asObservable(),
      ],
    ).pipe(
      map(([inputFocused, urlWithFooter]) =>
        this.deviceService.isMobile() && !inputFocused && urlWithFooter,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );

    this.showMobileHeader = this.menuMobileService.showHeader.asObservable().pipe(
      map(urlWithHeader =>
         this.deviceService.isMobile() && urlWithHeader,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );
  }

  get isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  onActivate(event) {
    document.getElementsByTagName('ion-content')[0].scrollToTop();
  }
}
