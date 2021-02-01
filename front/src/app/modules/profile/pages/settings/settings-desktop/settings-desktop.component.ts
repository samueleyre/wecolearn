import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { SettingsComponentBase } from '~/modules/profile/pages/settings/settings.component.base';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  selector: 'app-settings-desktop',
  templateUrl: './settings-desktop.component.html',
  styleUrls: ['./settings-desktop.component.scss'],
})
export class SettingsDesktopComponent extends SettingsComponentBase implements OnInit {
  constructor(
    private _profileService: ProfileService,
  ) {
    super(_profileService);
  }
}
