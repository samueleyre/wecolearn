import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '~/core/services/auth/auth';


@Component({
  selector: 'form-pwd-email',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SendPasswordConfirmationEmailComponent implements OnInit {
  public newEmail: string;
  public loading = false;


  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private _toastr: ToastrService,
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
              this._toastr.error(result['error']);
            } else {
              this._toastr.success('Un email vous a été envoyé pour réinitialiser votre mot de passe.');
              setTimeout(
                () => {
                  this.router.navigate(['/']);
                },
                4000); // tslint:disable-line no-magic-numbers
            }
          },
          (error) => {
            this.loading = false;
            this._toastr.error('Une erreur est survenue.');
          },
        );
  }
}
