import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { ToastService } from '~/core/services/toast.service';


@Component({
  selector: 'form-pwd-email-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SendPasswordConfirmationEmailMobileComponent implements OnInit {
  public newEmail: string;
  public loading = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private _toastr: ToastService,
  ) {}

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
            this._toastr.error(result['error']);
          } else {
            this._toastr.success('Un email vous a été envoyé pour réinitialiser votre mot de passe. ');
            setTimeout(
              () => {
                this.router.navigate(['/']);
              },
              4000); // tslint:disable-line no-magic-numbers
          }
        },
        (error) => {
          this.loading = false;
          this._toastr.success('Une erreur est survenue.');
        },
      );
  }
}
