import { Component, OnInit } from '@angular/core';

import { SettingsComponentBase } from '~/modules/profile/pages/settings/settings.component.base';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  selector: 'app-settings-mobile',
  templateUrl: './settings-mobile.component.html',
  styleUrls: ['./settings-mobile.component.scss'],
})
export class SettingsMobileComponent extends SettingsComponentBase implements OnInit {
  constructor(
    private _profileService: ProfileService,
  ) {
    super(_profileService);
  }
}
