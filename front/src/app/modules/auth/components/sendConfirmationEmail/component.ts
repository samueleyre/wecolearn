import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth';
import { ToastService } from '~/core/services/toast.service';

import { environment } from '../../../../../environments/environment';
import {PATTERN} from "~/shared/config/pattern";
import {EnvEnum} from "~/core/enums/env.enum";


@Component({
  selector: 'form-pwd-email',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SendPasswordConfirmationEmailComponent implements OnInit {
  public newEmail: string;
  public loading = false;
  public pattern;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private _toastr: ToastService,
  ) {
  }


  ngOnInit() {
    this.authenticationService.logout();
    this.pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  }

  sendEmail() {
    this.loading = true;
    this.authenticationService.sendEmailForPasswordReset(this.newEmail)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result['error']) {
              this._toastr.error(`Cet email n'est pas associé à un utilisateur actif.`);
            } else {
              this.router.navigate(['/']).then(() => {
                this._toastr.success('Un email vous a été envoyé pour réinitialiser votre mot de passe.');
              });
            }
          },
          (error) => {
            this.loading = false;
            this._toastr.error('Une erreur est survenue.');
          },
        );
  }
}
