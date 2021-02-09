import {
  Component,
  OnInit,
  Injectable,
  Inject, Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '~/core/entities/user/entity';
import { environment } from '~/../environments/environment';
import { PATTERN } from '~/shared/config/pattern';
import { ProfileService } from '~/core/services/user/profile.service';
import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { PASSWORD } from '~/config/validators.const';
import { passwordMatchValidator } from '~/modules/auth/validators/password-match.validator';
import { AuthenticationService } from '~/core/services/auth/auth.service';
import { ToastService } from '~/core/services/toast.service';
import { EnvEnum } from '~/core/enums/env.enum';


@Component({
  selector: 'user-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class SettingsComponent extends DestroyObservable implements OnInit {
  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private _dialog: DialogService,
    @Inject(APP_BASE_HREF) r: string,
    private router: Router,
    private _toastr: ToastService,
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
  ) {
    super();
    this.initEditable();
  }

  @Input() user: User;

  public newemail: string;
  public editing: object = {};
  public pattern: string;
  public newPasswordForm: FormGroup;

  get password() {
    return this.newPasswordForm.get('password');
  }

  get newPassword() {
    return this.newPasswordForm.get('new_password');
  }

  get passwordVerification() {
    return this.newPasswordForm.get('password_verification');
  }

  ngOnInit() {
    this.pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
    this.newemail = this.user.email;
    this.initPasswordForm();
  }

  submitChangeEmail(f: NgForm) {
    this.callApi({ email: this.newemail }).subscribe((user: User) => {
      this.initEditable();
    });
  }

  submitNewPassword() {
    this.callApi({
      password: this.password.value,
      newPassword: this.newPassword.value,
    }).subscribe((user) => {
      this.initEditable();
      this.newPasswordForm.reset();
    });
  }

  callApi(data: object): Observable<User> {
    const type = Object.keys(data)[0];
    return this.profileService.changeParameter(data).pipe(tap(
      (user: User) => {
        if ('email' === type) {
          this._toastr.success('Un email vous a été envoyé pour confirmer votre nouvel email');
        }
        if ('password' === type) {
          this._toastr.success('Le mot de passe a été modifié');
        }
        this.user = user;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this._toastr.error('Le mot de passe est incorrect.');
        }
        if (error.status === 409) {
          this._toastr.error('Cette adresse email est déjà utilisée.');
        }
      },
    ));
  }

  initEditable() {
    this.editing = {
      newemail: false,
      newpassword: false,
    };
  }

  makeEditable(idName: string) {
    this.initEditable();
    this.editing[idName] = true;
  }

  deleteAccount() {
    const title = 'Etes-vous sûr de vouloir supprimer votre compte ?';
    this._dialog
      .confirm(
        title,
        '',
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((choice) => {
        if (choice) {
          this.profileService.deleteAccount().subscribe((response) => {
            if (response['ok']) {
              this._toastr.info('Votre compte a bien été supprimé, ainsi que tout l\'historique de vos messages.');
              this.router.navigate(['/']);
            } else {
              this._toastr.error('Une erreur est survenue');
            }
          });
        }
      });
  }

  // password

  private initPasswordForm() {
    this.newPasswordForm = this._fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(PASSWORD.min), Validators.maxLength(PASSWORD.max)],
        ],
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

  public logOut() {
    this._authenticationService.logout(true);
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
}
