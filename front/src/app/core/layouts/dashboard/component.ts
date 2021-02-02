import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { distinctUntilChanged, map, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Network } from '@ionic-native/network/ngx';

import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { OnlineService } from '~/core/services/online.service';
import { NoConnectionToastComponent } from '~/shared/components/no-connection-toast/no-connection-toast.component';

import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainComponent extends DestroyObservable implements OnInit {
  public showMobileFooter: Observable<boolean>;
  public showMobileHeader: Observable<boolean>;

  constructor(
    private _deviceService: DeviceDetectorService,
    private _footerMobileService: FooterMobileService,
    private _menuMobileService: MenuMobileService,
    private _mobileOnlineService: OnlineService,
    private _snackBar: MatSnackBar,
    private _network: Network,
  ) {
    super();
  }

  ngOnInit() {
    this.showMobileFooter = combineLatest([
        this._footerMobileService.inputFocusState.asObservable(),
        this._footerMobileService.showFooter.asObservable(),
      ],
    ).pipe(
      map(([inputFocused, urlWithFooter]) =>
        this._deviceService.isMobile() && !inputFocused && urlWithFooter,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );

    this.showMobileHeader = this._menuMobileService.showHeader.asObservable().pipe(
      map(urlWithHeader =>
        this._deviceService.isMobile() && urlWithHeader,
      ),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    );

    if (environment.android) {
      this.initOnlineNotif();
    }
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }

  onActivate(event) {
    if (!window.location.hash && this.isMobile) {
      document.getElementsByTagName('ion-content')[0].scrollToTop();
    }
  }

  private initOnlineNotif(): void {
    this._mobileOnlineService.isOnlineObservable().pipe(
      startWith(true),
      pairwise(),
      takeUntil(this.destroy$)).subscribe(
      ([previouslyOnline, currentlyOnline]: [boolean, boolean]) => {
        if (!currentlyOnline) {
            // offline
          this._snackBar.openFromComponent(NoConnectionToastComponent);
        }

        if (currentlyOnline && !previouslyOnline) {
            // online again
          this._snackBar.dismiss();
        }
      });
  }
}
