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
    if ('surface' in next.data) {
      const redirectTo = 'redirectTo' in next.data ? next.data.redirectTo : NAV.dashHome;
      const surface = <('mobile' | 'desktop' | 'android')[]>next.data.surface;
      if (
        surface.includes('mobile') && !this._deviceService.isMobile()
      || surface.includes('android') && !environment.android
      || surface.includes('desktop') && (environment.android || this._deviceService.isMobile())
      ) {
        this._router.navigate([redirectTo]);
        return false;
      }

      // all good
      return true;
    }

    return true;
  }
}
