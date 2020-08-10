import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '~/../environments/environment';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';

@Component({
  selector: 'app-container',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ContainerComponent extends DestroyObservable implements OnInit{
  public showMobileOnBoardingFooter: Observable<boolean>;

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
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  get isAndroid() {
    return environment.android;
  }
}
