import {
  Component,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '../../../../../environments/environment';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingPageComponent {
  constructor(
    private deviceService: DeviceDetectorService,
  ) {}

  get isMobile() {
    return this.deviceService.isMobile();
  }

  get isAndroidApp() {
    return environment.android;
  }
}
