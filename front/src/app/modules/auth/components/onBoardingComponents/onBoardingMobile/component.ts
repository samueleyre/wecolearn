import {
  Component, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '~/core/services/auth/auth';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { NAV } from '~/config/navigation/nav';
import { ToastService } from '~/core/services/toast.service';
import { Tag } from '~/core/entities/tag/entity';
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
    super(_fb, _authenticationService, _router, _toastr);
    this._route.queryParams.subscribe((params) => {
      if ('tag_id' in params && 'tag_name' in params) {
        // remove query params
        this._router.navigate(
          [],
          {
            relativeTo: this._route,
          }).then(() => {
            this.addTag(
            new Tag({
              id: Number(params.tag_id),
              type: 0,
              name: params.tag_name,
            }),
          );
          });
      }
      if ('step' in params) {
        // remove query params
        this._router.navigate(
          [],
          {
            relativeTo: this._route,
          }).then(() => {
            // set step
            this._onBoardingService.signInTab = Number(params['step']);
          });
      }
    });
    this.formTabSelection$ = this._onBoardingService.signInTab$;
    this.showMobileOnBoardingFooter = this._footerMobileService.inputFocusState.asObservable().pipe(map(val => !val));
    this.userForm = this._onBoardingService.userForm;
  }

  ngOnInit() {
  }

  public addTag(tag: Tag): void {
    const tags = this.userForm.get('learn_tags').value;
    if (!tags.find(t => t.id === tag.id)) {
      tags.push(tag);
      this.userForm.get('learn_tags').setValue(tags);
    }
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

  get nav() {
    return NAV;
  }
}
