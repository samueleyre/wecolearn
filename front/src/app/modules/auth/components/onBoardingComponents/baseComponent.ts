import {
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '~/core/services/auth/auth.service';
import { PATTERN } from '~/shared/config/pattern';
import { onBoardingSections } from '~/modules/auth/components/onBoardingComponents/onBoarding.const';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { environment } from '~/../environments/environment';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { EnvEnum } from '~/core/enums/env.enum';
import { ToastService } from '~/core/services/toast.service';
import { Tag } from '~/core/entities/tag/entity';
import { OnBoardingService } from '~/modules/auth/services/on-boarding-mobile.service';
import { NAV } from '~/config/navigation/nav';
import { CommunityService } from '~/core/services/community/community.service';


@Component({
  template: 'empty',
})
export class AuthOnboardingBaseComponent extends DestroyObservable {
  private pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
  public titles = onBoardingSections;

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    learn_tags: [[]],
    biographie: null,
    latitude: null,
    longitude: null,
    city: null,
    email: [null, [Validators.required, Validators.pattern(this.pattern)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    newsletter: true,
  });

  public error: string;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService,
    private onBoardingService: OnBoardingService,
    private communityService: CommunityService,
  ) {
    super();
    this.route.queryParams.subscribe((params) => {
      if (
        'tag_name' in params || 'step' in params || 'community_token' in params
      ) {
        // remove query params
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
          }).then(() => {
            if ('tag_name' in params) {
              const tag = new Tag({
                type: 0,
                name: params.tag_name,
              });
              if ('tag_id' in params) {
                tag.id = Number(params.tag_id);
              }
              this.addTag(tag);
            }
            if ('step' in params) {
              // set step
              this.onBoardingService.signUpTab = Number(params['step']);
            }
            if ('community_token' in params) {
              this.checkCommunityToken(params['community_token']);
              this.onBoardingService.communityToken = params['community_token'];
            }
          });
      }
    });
  }

  public addTag(tag: Tag): void {
    const tags = this.userForm.get('learn_tags').value;
    if (
      'id' in tag && !tags.find(t => t.id === tag.id)
      || !tags.find(t => t.name === tag.name)
    ) {
      tags.push(tag);
      this.userForm.get('learn_tags').setValue(tags);
    }
  }

  login() {
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

  submit() {
    // only if on last index
    this.loading = true;
    this.signUp.subscribe(
      () => {
        this.login();
      },
      (error) => {
        this.loading = false;
        if (error.error && error.error.error && error.error.error === 'resource already used') {
          this.toastr.error('Cette adresse email est déjà utilisée.');
          this.emailControl.setErrors({ duplicate:true });
        }
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
    return this.authenticationService.signUp({ tags, ...this.userForm.value }, this.onBoardingService.communityToken);
  }

  get learnType(): TagTypeEnum {
    return TagTypeEnum.LEARN;
  }

  get nav() {
    return NAV;
  }

  private checkCommunityToken(communityToken: string) {
    this.communityService.checkJoinToken(communityToken).subscribe(
      (response: boolean) => {
      //
      },
      (err) => {
        this.router.navigate([NAV.landing]).then(() => {
          this.toastr.error("Ce lien d'invitation n'est pas valide");
        });
      });
  }
}
