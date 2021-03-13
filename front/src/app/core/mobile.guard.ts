import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Browser } from 'leaflet';

import { NAV } from '~/config/navigation/nav';

import { environment } from '../../environments/environment';
import mobile = Browser.mobile;

@Injectable({
  providedIn: 'root',
})
export class MobileGuard implements CanActivateChild {
  constructor(
    private _deviceService: DeviceDetectorService,
    private _router: Router,
  ) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url);

    if ('surface' in next.data) {
      const surface = <('mobile' | 'desktop' | 'android')[]>next.data.surface;
      if (
        surface.includes('mobile') && !this._deviceService.isMobile()
      || surface.includes('android') && !environment.android
      || surface.includes('desktop') && (environment.android || this._deviceService.isMobile())
      ) {
        let redirectUrl = NAV.dashHome;
        const redirectExtension = 'redirectTo' in next.data ? next.data.redirectTo : null;

        console.log(redirectExtension);

        if (redirectExtension !== null) {
          redirectUrl = state.url.replace(/\/android|\/mobile/, '');
          if (redirectExtension === 'mobile') {
            redirectUrl += '/mobile';
          } else if (redirectExtension === 'android') {
            redirectUrl += '/android';
          }
        }

        console.log({ redirectUrl });
        this._router.navigate([redirectUrl]);
        return false;
      }

      // all good
      return true;
    }

    return true;
  }
}
