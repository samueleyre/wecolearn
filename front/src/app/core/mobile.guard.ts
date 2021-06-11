import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Browser } from 'leaflet';

import { NAV } from '~/config/navigation/nav';

import { environment } from '../../environments/environment';

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
    if ('surface' in next.data) {
      const surface = <('mobile' | 'desktop' | 'android')[]>next.data.surface;
      let redirectUrl = state.url.replace(/\/android|\/mobile/, '');
      if (
      surface.includes('mobile') && surface.includes('android')
      ) {
        // not on mobile
        if (!this._deviceService.isMobile()) {
          this._router.navigate([redirectUrl]);
          return false;
        }
      } else {
        if (
          // not on mobile or installed on android
          surface.includes('mobile') && (!this._deviceService.isMobile() || environment.android)
        ) {
          redirectUrl += '/android';
          this._router.navigate([redirectUrl]);
          return false;
        }
        if (
          // not installed on android
          surface.includes('android') && !environment.android
        ) {
          this._router.navigate([redirectUrl]); // redirect to desktop
          return false;
        } if (
          // installed on android or on mobile
          surface.includes('desktop') && (environment.android || this._deviceService.isMobile())
        ) {
          redirectUrl += '/mobile';
          this._router.navigate([redirectUrl]);
          return false;
        }
      }
      
      // all good
      return true;
    }

    return true;
  }
}
