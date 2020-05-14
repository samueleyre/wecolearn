import {
  Component,
  OnInit,
  Injectable,
  Inject, Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '~/core/entities/user/entity';
import { environment } from '~/../environments/environment';
import { PATTERN } from '~/shared/config/pattern';
import { ProfileService } from '~/core/services/user/profile';
import { DialogService } from '~/core/services/dialog.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { PASSWORD } from '~/core/const/validators.const';
import { passwordMatchValidator } from '~/modules/auth/validators/password-match.validator';


@Component({
  selector: 'user-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class SettingsComponent extends DestroyObservable implements OnInit {
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

  constructor(
      private profileService: ProfileService,
      private activatedRoute: ActivatedRoute,
      private _dialog: DialogService,
      @Inject(APP_BASE_HREF) r: string,
      private router: Router,
      private _toastr: ToastrService,
      private _fb: FormBuilder,
  ) {
    super();
    this.initEditable();
  }

  ngOnInit() {
    this.pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
    this.newemail = this.user.email;
    this.initPasswordForm();
  }

  submitChangeEmail(f: NgForm) {
    this.callApi({ email: this.newemail }).subscribe((result: boolean) => {
      if (result) {
        this.initEditable();
      }
    });
  }

  submitNewPassword() {
    this.callApi({
      password: this.password.value,
      newPassword: this.newPassword.value,
    }).subscribe((result: boolean) => {
      if (result) {
        this.initEditable();
        this.newPasswordForm.reset();
      }
    });
  }

  callApi(data: object): Observable<boolean> {
    const type = Object.keys(data)[0];

    return this.profileService.changeParameter(data).pipe(map(
      (response) => {
        if (response['wrong']) {
          this._toastr.error('Le mot de passe est incorrect.');
          return false;
        }
        if (response['duplicate']) {
          this._toastr.error('Cette adresse email est déjà utilisée.');
          return false;
        }
        if (response['changed']) {
          this._toastr.success('Le mot de passe a été modifié');
          return true;
        }
        if (response['error']) {
          console.error(response['error']);
          return false;
        }
        if (type === 'email') {
          this._toastr.success('Un email vous a été envoyé pour confirmer votre nouvel email');
          this.user = response['user'];
          return true;
        }
        return true;
      },
      (error) => {
        console.log(error);
      },
    ));
  }

  initEditable(value: boolean = false) {
    this.editing = {
      newemail: value,
      newpassword: value,
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
