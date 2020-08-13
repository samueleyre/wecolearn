import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { NAV } from '~/config/navigation/nav';
import { ToastService } from '~/core/services/toast.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CookieNotificationService {
  constructor(private _toastr: ToastService, private _deviceService: DeviceDetectorService) {
  }

  notifyCookie(): void {
    if (environment.android || this._deviceService.isMobile()) {
      return;
    }
    setTimeout(() => {
      if (!localStorage.getItem('cookieseen')) {
        this._toastr.info(
          `Nous avons recours à l'utilisation de cookies afin de vous permettre une meilleure navigation.`
          + ` Le fait de continuer signifie que vous acceptez <a href="${NAV.cookiePolicy}">l'utilisation de ces cookies.</a>`,
          'Cookies',
          {
            disableTimeOut: true,
            enableHtml: true,
            closeButton: true,
          },
        );
        localStorage.setItem('cookieseen', 'yes');
      }
    });
  }
}
