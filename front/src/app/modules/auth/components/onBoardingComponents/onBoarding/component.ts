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
import { Tag } from '~/core/entities/tag/entity';


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
  ) {
    super(_fb, _authenticationService, _router, _toastr);
    _route.queryParams.subscribe((params) => {
      if ('tag_id' in params && 'tag_name' in params) {
        // remove query params
        _router.navigate(
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
    });
  }

  addTag(tag: Tag): void {
    const tags = this.userForm.get('learn_tags').value;
    if (!tags.find(t => t.id === tag.id)) {
      tags.push(tag);
      this.userForm.get('learn_tags').setValue(tags);
    }
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
}
