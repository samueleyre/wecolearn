
import {
  Component,
  Injectable,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '~/shared/services/user';
import { AuthenticationService } from '~/shared/services/auth/auth';

import { environment } from '~/../environments/environment';


@Component({
  selector: 'profile-onboarding-mobile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

@Injectable()
export class AuthOnboardingMobileComponent{
  pattern = (environment.production) ?
    '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' : '[a-zA-Z0-9.+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    image: null,
    learn_tags: [],
    know_tags: [],
    teach_tags: [],
    biographie: null,
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
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    //
  }

  submit() {
    this.userService.postNewUser({ tags: this.userForm.value.learn_tags, ...this.userForm.value }).subscribe(
      (response) => {
        this.login();
      },
      (error) => {
        if (error.error && error.error && error.error.error === 'resource already used') {
          this.error = 'Cette adresse email est déjà utilisée.';
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
