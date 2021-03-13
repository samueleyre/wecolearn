import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'landing-signin-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class LandingSigninMobileComponent {
  constructor(private device: DeviceDetectorService) {
  }

  public get isAndroid() {
    return this.device.getDeviceInfo().device.toLowerCase() === 'android';
  }
}
