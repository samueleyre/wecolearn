import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

import { NAV } from '~/config/navigation/nav';

@Injectable({
  providedIn: 'root',
})
export class WcRouterService {
  constructor(private _deviceService: DeviceDetectorService, private _router: Router) { }

  public navigateToCurrentDiscussion(userId, callback): void {
    this._deviceService.isMobile()
      ? this._router.navigate([`${NAV.currentDiscussion}/${userId}`])
      : this._router.navigate([NAV.discussion]).then(callback);
  }
}
