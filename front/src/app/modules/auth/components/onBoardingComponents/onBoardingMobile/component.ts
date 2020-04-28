import {
  Component, OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';

@Component({
  selector: 'profile-onboarding-mobile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingMobileComponent extends AuthOnboardingBaseComponent {
  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) {
    super(_fb, _authenticationService, _router);
  }

  submit() {
    this.signUp.subscribe(
      (response) => {
        this.login();
      },
      (error) => {
        if (error.error && error.error.error && error.error.error === 'resource already used') {
          this.emailControl.setErrors({ duplicate:true });
        }
      },
    );
  }
}
