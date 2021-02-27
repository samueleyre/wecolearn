import {
  Component,
  OnInit,
  Injectable, Input,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';
import { Tag } from '~/core/entities/tag/entity';
import { ToastService } from '~/core/services/toast.service';
import { ProfileService } from '~/core/services/user/profile.service';
import { NAV } from '~/config/navigation/nav';


@Component({
  selector: 'showProfilSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ShowProfilSettingsComponent {
  constructor(private _profileService: ProfileService,
              private _toastr: ToastService,
              private _deviceService: DeviceDetectorService,
  ) {}

  @Input() user: User;

  get isDisabled(): boolean {
    return !(
      !!this.user.first_name &&
      !!this.user.biographie &&
      !!this.user.tags.filter((tag:Tag) => tag.type === 0)[0]
    ) && !this.user.show_profil;
  }

  get isMobile() {
    return this._deviceService.isMobile();
  }

  get nav() {
    return NAV;
  }

  submit() {
    setTimeout(
      () => {
        this._profileService.put({ show_profil: this.user.show_profil }).subscribe(
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
