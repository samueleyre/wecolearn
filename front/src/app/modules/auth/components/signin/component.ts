import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { CommunityService } from '~/core/services/community/community.service';
import { NAV } from '~/config/navigation/nav';
import { CookieNotificationService } from '~/core/services/cookie-notification.service';
import { PATTERN } from '~/shared/config/pattern';
import { ToastService } from '~/core/services/toast.service';
import { EnvEnum } from '~/core/enums/env.enum';

import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'form-signin',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SigninComponent implements OnInit {
  model: any = {};
  public loading = false;
  public error = '';
  public pattern: string;
  subscribeLink = NAV.signup;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private domainService: CommunityService,
    private cookieNotification: CookieNotificationService,
    private _toastr: ToastService,
  ) {
  }

  ngOnInit() {
    // manage cookie notif
    this.cookieNotification.notifyCookie();

    // reset login status
    this.authenticationService.logout();
    this.pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result) {
              this.router.navigate([NAV.search]);
            }
          },
          (error) => {
            this._toastr.error('L\'email et/ou le mot de passe ne sont pas valide.');
            this.loading = false;
          },
        );
  }
}
