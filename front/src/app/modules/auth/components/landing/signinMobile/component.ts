import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'landing-signin-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class LandingSigninMobileComponent {
  constructor(private device: DeviceDetectorService) {
  }

  public get isAndroid() {
    // is on Android device but not on installed app
    return this.device.getDeviceInfo().device.toLowerCase() === 'android'
      && !environment.android;
  }
}
