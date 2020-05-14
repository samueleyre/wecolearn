import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ProfileService } from '~/core/services/user/profile';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileSettingsPageComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  constructor(private _profileService: ProfileService, private _deviceService: DeviceDetectorService) {}

  get isMobile() {
    return this._deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
