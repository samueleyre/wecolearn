import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-profil-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileSettingsPageComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  constructor(private _deviceService: DeviceDetectorService) {}

  get isMobile() {
    return this._deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
