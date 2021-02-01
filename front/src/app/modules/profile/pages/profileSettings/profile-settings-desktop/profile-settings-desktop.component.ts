import { Component, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ProfileSettingsComponentBase } from '~/modules/profile/pages/profileSettings/profile-settings.component.base';
import { DomainService } from '~/core/services/domain/domain';
import { ProfileService } from '~/core/services/user/profile.service';
import { ToastService } from '~/core/services/toast.service';

@Component({
  selector: 'app-profile-settings-desktop',
  templateUrl: './profile-settings-desktop.component.html',
  styleUrls: ['./profile-settings-desktop.component.scss'],
})
export class ProfileSettingsDesktopComponent extends ProfileSettingsComponentBase implements OnInit {
  constructor(
    @Inject(APP_BASE_HREF) _r: string,
    private _domainService: DomainService,
    private _fb: FormBuilder,
    private _deviceService: DeviceDetectorService,
    private _profileService: ProfileService,
    private _toastService: ToastService,
  ) {
    super(_r, _domainService, _fb, _deviceService, _profileService, _toastService);
  }
}
