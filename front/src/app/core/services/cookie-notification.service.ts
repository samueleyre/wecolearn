import { Injectable } from '@angular/core';

import { NAV } from '~/config/navigation/nav';
import { ToastService } from '~/core/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CookieNotificationService {
  constructor(private _toastr: ToastService) {
  }

  notifyCookie() {
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
