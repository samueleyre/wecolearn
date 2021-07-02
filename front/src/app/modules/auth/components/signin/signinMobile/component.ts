import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { CommunityService } from '~/core/services/community/community.service';
import { NAV } from '~/config/navigation/nav';
import { CookieNotificationService } from '~/core/services/cookie-notification.service';
import { SigninBaseComponent } from '~/modules/auth/components/signin/component';


@Component({
  selector: 'form-signin-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SigninMobileComponent extends SigninBaseComponent implements OnInit {
  public loading = false;
  public error = '';
  public pattern: string;
  subscribeLink = NAV.signup;
  user = { email: '', password: '' };


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private domainService: CommunityService,
    private cookieNotification: CookieNotificationService,
    private fb: FormBuilder,
  ) {
    super(router, authenticationService, domainService, cookieNotification, fb);
  }

  displayAuthError() {
    this.error = 'L\'email et/ou le mot de passe ne sont pas valide';
  }
}
