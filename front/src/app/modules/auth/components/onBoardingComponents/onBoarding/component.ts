import {
  Component,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '~/core/services/auth/auth';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';


@Component({
  selector: 'profile-onboarding',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingComponent extends AuthOnboardingBaseComponent{
  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {
    super(_fb, _authenticationService, _router);
  }

  submit() {
    this._authenticationService.signUp({ tags: this.userForm.value.learn_tags, ...this.userForm.value }).subscribe(
      (response) => {
        this.login();
      },
      (error) => {
        if (error.error && error.error && error.error.error === 'resource already used') {
          this._toastr.error('Cette adresse email est déjà utilisée.');
          setTimeout(
            () => {
              this.error = null;
            },
            5000); // tslint:disable-line no-magic-numbers
        }
      },
    );
  }
}
