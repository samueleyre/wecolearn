import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    if ('desktopOnly' in next.data) {
      if (this._deviceService.isMobile()) {
        this._router.navigate([state.url + '/mobile']);
        return false;
      }
      return true;
    }
    if ('mobileNavigatorOnly' in next.data) {
      if (environment.android) {
        this._router.navigate([state.url + '/android']);
        return false;
      }
      return true;
    }

    return true;
  }
}
