import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '~/core/services/auth/auth';
import { PASSWORD } from '~/config/validators.const';
import { passwordMatchValidator } from '~/modules/auth/validators/password-match.validator';
import { ToastService } from '~/core/services/toast.service';


@Component({
  selector: 'form-pwd-reset',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ResetPasswordFormComponent implements OnInit {
  public loading = false;
  private token: string;
  public newPasswordForm: FormGroup;

  get password() {
    return this.newPasswordForm.get('new_password');
  }

  get passwordVerification() {
    return this.newPasswordForm.get('password_verification');
  }

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private _toastr: ToastService,
      private _fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params && params['token']) {
        this.authenticationService.checkPasswordToken(params['token']).subscribe(
          (result) => {
            this.loading = false;
            if (result['error']) {
              this.router.navigate(['/']).then(() => {
                this._toastr.error('Une erreur est survenue lors de la réinitalisation de votre mot de passe, ' +
                  'vérifier que vous avez bien ouvert le dernier email intitulé "Nouveau mot de passe ". ');
              });
            } else {
              this.token = params['token'];
            }
          },
          (error) => {
            this.router.navigate(['/']);
          },
        );
      }
    });
    this.initForm();
  }

  private initForm() {
    this.newPasswordForm = this._fb.group(
      {
        new_password: [
          '',
          [Validators.required, Validators.minLength(PASSWORD.min), Validators.maxLength(PASSWORD.max)],
        ],
        password_verification: [
          '',
          [Validators.required, Validators.minLength(PASSWORD.min), Validators.maxLength(PASSWORD.max)],
        ],
      },
      { validator: passwordMatchValidator },
    );
  }

  /**
   * Called on each input in either password field
   */
  public onPasswordInput(): void {
    if (this.newPasswordForm.hasError('passwordMismatch')) {
      const errors = this.passwordVerification.errors || {};
      this.passwordVerification.setErrors({
        ...errors,
        passwordMismatch: true,
      });
    } else {
      this.passwordVerification.setErrors(null);
    }
  }

  changePassword() {
    if (this.token) {
      this.authenticationService.resetPassword(this.newPasswordForm.get('new_password').value, this.token)
        .subscribe(
          (result) => {
            this.loading = false;
            if (result['error']) {
              this._toastr.error(result['error']);
            } else {
              this.router.navigate(['/dashboard/search']).then(() => {
                this._toastr.success('Votre mot de passe a été modifié avec succès !');
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
}
