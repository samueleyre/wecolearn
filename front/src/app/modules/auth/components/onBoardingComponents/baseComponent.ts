import {
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { AuthenticationService } from '~/core/services/auth/auth';
import { PATTERN } from '~/shared/config/pattern';
import { onBoardingSections } from '~/modules/auth/components/onBoardingComponents/onBoarding.const';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { environment } from '~/../environments/environment';
import { DestroyObservable } from '~/core/components/destroy-observable';
import {EnvEnum} from "~/core/enums/env.enum";


@Component({
  template: 'empty',
})
export class AuthOnboardingBaseComponent extends DestroyObservable {
  private pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  public titles = onBoardingSections;

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    learn_tags: [],
    biographie: null,
    latitude: null,
    longitude: null,
    email: [null, [Validators.required, Validators.pattern(this.pattern)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    newsletter: true,
  });

  error:string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    super();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.userForm.value.email, this.userForm.value.password)
      .subscribe(
        (result) => {
          this.loading = false;
          if (result) {
            // login successful
            this.router.navigate(['/dashboard/search']);
          }
        },
        (error) => {
          this.loading = false;
        },
      );
  }

  get tagInput(): HTMLDivElement {
    return <HTMLDivElement>document.getElementsByClassName('mat-chip-input')[0];
  }

  get bioInput(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementsByTagName('textarea')[0];
  }

  get firstnameInput(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('firstNameInput');
  }

  public get emailControl() {
    return this.userForm.get('email');
  }

  get signUp(): Observable<any> {
    const tags = this.userForm.value.learn_tags ? this.userForm.value.learn_tags : []; // bug of null tags parameter
    return this.authenticationService.signUp({ tags, ...this.userForm.value });
  }

  get learnType(): TagTypeEnum {
    return TagTypeEnum.LEARN;
  }
}
