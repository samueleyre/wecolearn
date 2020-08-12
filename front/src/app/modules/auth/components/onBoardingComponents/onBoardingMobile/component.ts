import {
  Component, OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'profile-onboarding-mobile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingMobileComponent extends AuthOnboardingBaseComponent implements OnInit {
  private formTabSelection = new BehaviorSubject(0);
  public formTabSelection$: Observable<number>;
  public showMobileOnBoardingFooter: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _footerMobileService: FooterMobileService,
  ) {
    super(_fb, _authenticationService, _router);
  }

  ngOnInit() {
    this.formTabSelection$ = this.formTabSelection.asObservable();
    this.showMobileOnBoardingFooter = this._footerMobileService.inputFocusState.asObservable().pipe(map(val => !val));
  }

  changedSelection(val: number) {
    this.formTabSelection.next(val);
  }

  setSelection($event: StepperSelectionEvent) {
    if ($event.selectedIndex !== this.selectedIndex) {
      this.formTabSelection.next($event.selectedIndex);
    }
  }

  get selectedIndex() {
    return this.formTabSelection.getValue();
  }

  nextPage() {
    this.formTabSelection.next(this.formTabSelection.getValue() + 1);
  }

  previousPage() {
    this.formTabSelection.next(this.selectedIndex - 1);
  }

  get hasPrevious() {
    return this.selectedIndex > 0;
  }

  get hasNext() {
    return this.selectedIndex < 3;
  }

  get hasValidationButton() {
    return this.selectedIndex === 3;
  }

  get nav() {
    return NAV;
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
