import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '~/core/services/auth/auth';


@Component({
  selector: 'form-pwd-reset',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ResetPasswordFormComponent implements OnInit {
  public newPassword: string;
  public loading = false;
  public error: string;
  public success: string;
  private token: string;
  public barLabel = '';

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private _toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params && params['token']) {
        this.authenticationService.checkPasswordToken(params['token']).subscribe(
          (result) => {
            if (result['error']) {
              this.router.navigate(['/login']);
              this._toastr.error('Une erreur est survenue lors de la réinitalisation de votre mot de passe, ' +
                'vérifier que vous avez bien ouvert le dernier email intitulé "Nouveau mot de passe ". ');
            } else {
              this.token = params['token'];
            }
          },
          (error) => {
            this.router.navigate(['/login']);
          },
        );
      } else {
        // this.error =""
      }
    });
  }

  changePassword() {
    this.loading = true;
    if (this.token) {
      this.authenticationService.resetPassword(this.newPassword, this.token)
          .subscribe(
            (result) => {
              this.loading = false;
              if (result['error']) {
                this.error = result['error'];
              } else {
                this.success = 'Votre mot de passe a été modifié avec succès !';
                setTimeout(
                  () => {
                    this.router.navigate(['/dashboard/search']);
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
}
