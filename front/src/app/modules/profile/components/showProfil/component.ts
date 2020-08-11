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


@Component({
  selector: 'showProfilSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ShowProfilSettingsComponent {
  public profilDisableInformation = 'Pour pouvoir rendre visible votre profil ' +
    "vous devez remplir votre biographie et ajouter un domaine d'apprentissage";


  constructor(private _profileService: ProfileService,
              private _toastr: ToastService,
              private _deviceService: DeviceDetectorService,
  ) {}

  @Input() user: User;

  get isDisabled(): boolean {
    return !(!!this.user.first_name && !!this.user.biographie && !!this.user.tags.filter((tag:Tag) => tag.type === 0)[0]);
  }

  get isMobile() {
    return this._deviceService.isMobile();
  }

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
