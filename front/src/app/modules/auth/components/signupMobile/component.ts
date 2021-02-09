import {
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '~/core/entities/user/entity';
import { AuthenticationService } from '~/core/services/auth/auth.service';
import { DomainService } from '~/core/services/domain/domain';
import { environment } from '~/../environments/environment';
import { ERRORS } from '~/config/errors';
import {PATTERN} from "~/shared/config/pattern";
import {EnvEnum} from "~/core/enums/env.enum";


@Component({
  selector: 'form-signup-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class SignupMobileComponent implements OnInit {
  user: User;
  users: User[];
  edition = false;
  loading = false;
  public barLabel = 'Difficulté du mot de passe : ';
  public error: string;
  public pattern: string;


  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private domainService: DomainService,
  ) {
    this.users = [];
    this.user = new User();
  }

  ngOnInit() {
    this.authenticationService.logout();
    // let subDomain = this.domainService.getSubDomain();
    // if (subDomain === 'wecolearn') {
    //   subDomain = '';
    // } else {
    //   subDomain += '.';
    // }
    this.pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  }


  submit(f: NgForm) {
    this.authenticationService.signUp(this.user).subscribe(
      (response) => {
        if (response === 'duplicate') {
          this.error = 'L\'adresse email est déjà utilisé.';
          setTimeout(
            () => {
              this.error = null;
            },
            5000); // tslint:disable-line no-magic-numbers
        } else {
          this.login();
        }
      },
      (error: HttpErrorResponse) => {
        this.error = (error.status === ERRORS.types.conflict) ?
          'Cette adresse email est déjà associée à un compte utilisateur.' : ERRORS.messages.default;
        console.log(error);
      },
    );
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result) {
                // login successful
              this.router.navigate(['/dashboard/profile']);
            }
          },
          (error) => {
            this.loading = false;
          },
        );
  }
}
