import {
  Component, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { ToastService } from '~/core/services/toast.service';
import { OnBoardingService } from '~/modules/auth/services/on-boarding-mobile.service';

@Component({
  selector: 'profile-onboarding-mobile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingMobileComponent extends AuthOnboardingBaseComponent implements OnInit {
  public showMobileOnBoardingFooter: Observable<boolean>;
  public formTabSelection$: Observable<number>;
  public userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastService,
    private _footerMobileService: FooterMobileService,
    private _onBoardingService: OnBoardingService,
  ) {
    super(_fb, _authenticationService, _router, _route, _toastr, _onBoardingService);
    this.formTabSelection$ = this._onBoardingService.signInTab$;
    this.showMobileOnBoardingFooter = this._footerMobileService.inputFocusState.asObservable().pipe(map(val => !val));
    this.userForm = this._onBoardingService.userForm;
  }

  ngOnInit() {
  }

  changedSelection(val: number): void {
    this._onBoardingService.signInTab = val;
  }

  setSelection($event: StepperSelectionEvent): void {
    if ($event.selectedIndex !== this.selectedIndex) {
      this._onBoardingService.signInTab = $event.selectedIndex;
    }
  }

  get selectedIndex(): number {
    return this._onBoardingService.signInTabCurrent;
  }

  nextPage(): void {
    this._onBoardingService.signInTab = this.selectedIndex + 1;
  }

  previousPage(): void {
    this._onBoardingService.signInTab = this.selectedIndex - 1;
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
}
