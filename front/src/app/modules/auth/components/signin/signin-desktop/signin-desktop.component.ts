import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { CommunityService } from '~/core/services/community/community.service';
import { CookieNotificationService } from '~/core/services/cookie-notification.service';
import { ToastService } from '~/core/services/toast.service';
import { SigninBaseComponent } from '~/modules/auth/components/signin/component';


@Component({
  selector: 'app-signin-desktop',
  templateUrl: './signin-desktop.component.html',
  styleUrls: ['./signin-desktop.component.scss'],
})
export class SigninDesktopComponent extends SigninBaseComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private domainService: CommunityService,
    private cookieNotification: CookieNotificationService,
    private fb: FormBuilder,
    private _toastr: ToastService,
  ) {
    super(router, authenticationService, domainService, cookieNotification, fb);
  }

  displayAuthError() {
    this._toastr.error('Le courriel et/ou le mot de passe ne sont pas valides.');
  }
}
