import {
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '~/core/services/auth/auth';
import { PATTERN } from '~/shared/config/pattern';
import { onBoardingSections } from '~/modules/auth/components/onBoardingComponents/onBoarding.const';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

import { environment } from '~/../environments/environment';


@Component({
  template: 'empty',
})
export class AuthOnboardingBaseComponent {
  pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
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
  ) {}

  login() {
    this.loading = true;
    this.authenticationService.login(this.userForm.value.email, this.userForm.value.password)
      .subscribe(
        (result) => {
          this.loading = false;
          if (result) {
            // login successful
            this.router.navigate(['/dashboard/profile']);
          }
        },
        (error) => {
          this.loading = false;
        },
      );
  }

  get learnType(): TagTypeEnum {
    return TagTypeEnum.LEARN;
  }
}
