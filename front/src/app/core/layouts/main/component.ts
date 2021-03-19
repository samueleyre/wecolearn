import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '~/../environments/environment';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'app-container',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ContainerComponent extends DestroyObservable implements OnInit{
  public showMobileOnBoardingFooter: Observable<boolean>;
  public showMainFooter: Observable<boolean>;

  constructor(
    private _footerMobileService: FooterMobileService,
    private _deviceService: DeviceDetectorService,
  ) {
    super();
  }

  ngOnInit() {
    this.showMobileOnBoardingFooter = combineLatest([
        this._footerMobileService.inputFocusState.asObservable(),
        this._footerMobileService.showOnboardingFooter.asObservable(),
      ],
    ).pipe(
      map(([inputFocused, urlWithFooter]) =>
        this._deviceService.isMobile() && !inputFocused && urlWithFooter,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );

    this.showMainFooter = this._footerMobileService.showMainFooter.asObservable()
      .pipe(
        map(
          val => !this.isAndroid && val || !this._deviceService.isMobile(),
        ),
      );
  }

  onActivate(event) {
    if (!window.location.hash && this._deviceService.isMobile()) {
      document.getElementsByTagName('ion-content')[0].scrollToTop();
    }
  }

  get landingPage(): string {
    return NAV.landing;
  }

  get isAndroid(): boolean {
    return environment.android;
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }

  get isNotLandingPage(): boolean {
    return !(new RegExp(NAV.landing).test(window.location.pathname));
  }
}
