import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';

@Component({
  selector: 'app-ionic-container',
  templateUrl: './ionic-container.component.html',
  styleUrls: ['./ionic-container.component.scss'],
})
export class IonicContainerComponent extends DestroyObservable implements OnInit {
  public disableScroll: Observable<boolean>;

  constructor(
    private _deviceService: DeviceDetectorService,
    public footerMobileService: FooterMobileService,
  ) {
    super();
  }

  ngOnInit() {
    this.disableScroll = this.footerMobileService.disableScrollingOnIonContent.asObservable().pipe(
      map(urlWithHeader =>
        this._deviceService.isMobile() && urlWithHeader,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }
}
