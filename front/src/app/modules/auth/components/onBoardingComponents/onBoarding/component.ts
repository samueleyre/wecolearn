import {
  Component,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { ToastService } from '~/core/services/toast.service';


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
    private _toastr: ToastService,
  ) {
    super(_fb, _authenticationService, _router);
  }

  submit() {
    // only if on last index
    this.signUp.subscribe(
      () => {
        this.login();
      },
      (error) => {
        if (error.error && error.error.error && error.error.error === 'resource already used') {
          this._toastr.error('Cette adresse email est déjà utilisée.');
          this.emailControl.setErrors({ duplicate:true });
        }
      },
    );
  }
}
