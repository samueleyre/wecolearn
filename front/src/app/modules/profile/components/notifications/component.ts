import {
  Component,
  OnInit,
  Injectable, Input,
} from '@angular/core';

import { User } from '~/core/entities/user/entity';
import { UserService } from '~/core/services/user/user.service';
import { ToastService } from '~/core/services/toast.service';
import { ProfileService } from '~/core/services/user/profile.service';


@Component({
  selector: 'emailNotificationSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class EmailNotificationSettingsComponent {
  constructor(private _profileService: ProfileService, private _toastr: ToastService) {}

  @Input() user: User;

  submit() {
    setTimeout(
      () => {
        this._profileService.patch(this.user).subscribe(
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
