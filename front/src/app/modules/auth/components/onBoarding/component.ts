import {
  Component,
  Injectable,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '~/core/services/auth/auth';
import { environment } from '~/../environments/environment';
import { PATTERN } from '~/shared/config/pattern';


@Component({
  selector: 'profile-onboarding',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingComponent{
  pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    image: null,
    learn_tags: [],
    biographie: null,
    know_tags: [],
    teach_tags: [],
    intensity: null,
    slack_accounts: [],
    latitude: null,
    longitude: null,
    email: [null, [Validators.required, Validators.pattern(this.pattern)]],
    password: [null, [Validators.required]],
  });


  error:string;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private _toastr: ToastrService,
  ) {
    //
  }

  submit() {
    this.authenticationService.signUp({ tags: this.userForm.value.learn_tags, ...this.userForm.value }).subscribe(
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
}
