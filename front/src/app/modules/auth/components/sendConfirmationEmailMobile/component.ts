import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthenticationService } from '~/shared/services/auth/auth';


@Component({
  selector: 'form-pwd-email-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SendPasswordConfirmationEmailMobileComponent implements OnInit {
  public newEmail: string;
  public loading = false;
  public error: string;
  public success: string;


  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
  ) {
  }


  ngOnInit() {
    this.authenticationService.logout();
  }

  sendEmail() {
    this.loading = true;
    this.authenticationService.sendEmailForPasswordReset(this.newEmail)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result['error']) {
              this.error = result['error'];
            } else {
              this.success = 'Un email vous a été envoyé pour réinitialiser votre mot de passe. ';
              setTimeout(
                () => {
                  this.router.navigate(['/']);
                },
                4000); // tslint:disable-line no-magic-numbers
            }
          },
          (error) => {
            this.loading = false;
            this.error = 'Une erreur est survenue.';
          },
        );
  }
}
