import {
  Component,
  OnInit,
  Injectable, Input,
} from '@angular/core';

import { User } from '~/core/entities/user/entity';
import { ProfileService } from '~/core/services/user/profile.service';
import { ToastService } from '~/core/services/toast.service';

import { environment } from '~/../environments/environment';


@Component({
  selector: 'emailNotificationSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class EmailNotificationSettingsComponent {
  constructor(private _profileService: ProfileService, private _toastr: ToastService) {
  }

  @Input() user: User;

  get isAndroid() {
    return environment.android;
  }

  submit() {
    setTimeout(
      () => {
        this._profileService.put(
          {
            new_message_notification: this.user.new_message_notification,
            new_match_notification: this.user.new_match_notification,
            new_message_email: this.user.new_message_email,
            new_match_email: this.user.new_match_email,
            newsletter: this.user.newsletter,
          },
        ).subscribe(
          (entity: User) => {
            this._toastr.success('Modification prise en compte');
          },
          (error) => {
            console.log(error);
          },
        );
      },
      0);
  }
}
