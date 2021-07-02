import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { CommunityService } from '~/core/services/community/community.service';
import { NAV } from '~/config/navigation/nav';
import { CookieNotificationService } from '~/core/services/cookie-notification.service';
import { PATTERN } from '~/shared/config/pattern';
import { EnvEnum } from '~/core/enums/env.enum';

import { environment } from '../../../../../environments/environment';


@Component({
  template: '',
})

export class SigninBaseComponent implements OnInit {
  public loading = false;
  public error = '';
  public pattern: string;
  subscribeLink = NAV.signup;
  public loginFormGroup = this._fb.group({
    email: [null, [Validators.required, Validators.pattern(this.pattern)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _domainService: CommunityService,
    private _cookieNotification: CookieNotificationService,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    // manage cookie notif
    this._cookieNotification.notifyCookie();

    // reset login status
    this._authenticationService.logout();
    this.pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  }


  public submit(): void {
    this.loading = true;

    this._authenticationService.login(
      this.loginFormGroup.get('email').value,
      this.loginFormGroup.get('password').value,
    )
        .subscribe(
          (result) => {
            this.loading = false;
            if (result) {
              this._router.navigate([NAV.search]);
            }
          },
          (error) => {
            this.displayAuthError();
            this.loading = false;
          },
        );
  }

  displayAuthError() {
  }
}
