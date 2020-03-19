import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth';
import { DomainService } from '~/core/services/domain/domain';
import { NAV } from '~/config/navigation/nav';

import { environment } from '~/../environments/environment';
import { PATTERN } from '~/shared/config/pattern';


@Component({
  selector: 'form-signin-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SigninMobileComponent implements OnInit {
  public loading = false;
  public error = '';
  public pattern: string;
  subscribeLink = NAV.signup;
  user = { email: '', password: '' };


  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private domainService: DomainService,

  ) {
  }

  ngOnInit() {
    // reset login status
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
    this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result) {
              this.router.navigate([NAV.search]);
            }
          },
          (error) => {
            this.error = 'L\'email et/ou le mot de passe ne sont pas valide';
            this.loading = false;
          },
        );
  }
}
