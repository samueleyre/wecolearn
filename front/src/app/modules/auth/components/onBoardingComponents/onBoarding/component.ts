import {
  Component,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { ToastService } from '~/core/services/toast.service';
import { onBoardingSections } from '~/modules/auth/components/onBoardingComponents/onBoarding.const';
import { OnBoardingService } from '~/modules/auth/services/on-boarding-mobile.service';
import {environment} from '../../../../../../environments/environment';


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
    private _route: ActivatedRoute,
    private _toastr: ToastService,
    private _onBoardingService: OnBoardingService,
  ) {
    super(_fb, _authenticationService, _router, _route, _toastr, _onBoardingService);
  }

  setSelection($event:StepperSelectionEvent) {
    if ($event.selectedIndex === onBoardingSections.tags.index) {
      setTimeout(() => {
        this.tagInput.focus();
      },         500);
    }
    if ($event.selectedIndex === onBoardingSections.bio.index) {
      setTimeout(() => {
        this.bioInput.focus();
      },         500);
    }
    if ($event.selectedIndex === onBoardingSections.ids.index) {
      setTimeout(() => {
        this.firstnameInput.focus();
      },         500);
    }
  }

  getLink(link) {
    return `${environment.publique}${link}`;
  }
}
