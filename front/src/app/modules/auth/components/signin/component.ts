import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '~/core/services/auth/auth';
import { DomainService } from '~/core/services/domain';
import { NAV } from '~/config/navigation/nav';
import { CookieNotificationService } from '~/core/services/cookie-notification.service';

import { environment } from '../../../../../environments/environment';
import {PATTERN} from "~/shared/config/pattern";


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
    private domainService: DomainService,
    private cookieNotification: CookieNotificationService,
    private _toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    // reset login status
    this.cookieNotification.notifyCookie();
    this.authenticationService.logout();
    let subDomain = this.domainService.getSubDomain();
    if (subDomain === 'wecolearn') {
      subDomain = '';
    } else {
      subDomain += '.';
    }
    this.pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
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
