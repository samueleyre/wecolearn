import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { NAV } from '~/config/navigation/nav';
import { getBaseLocation } from '~/core/services/layout/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class WcRouterService {
  _previousUrl = null;

  constructor(private _deviceService: DeviceDetectorService, private _router: Router) {
    _router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        const previous = events[0].urlAfterRedirects;
        const current = events[1].urlAfterRedirects;
        if (current !== previous + '/mobile') {
          this._previousUrl = previous;
        }
      });
  }

  /**
   * get previous page
   */
  public getReturnLink(defaultLink: string) {
    if (this._previousUrl) {
      return this._previousUrl;
    }

    return defaultLink;
  }

  public navigateToCurrentDiscussion(userId, callback): void {
    this._deviceService.isMobile()
      ? this._router.navigate([`${NAV.currentDiscussion}/${userId}`])
      : this._router.navigate([NAV.discussion]).then(callback);
  }
}
