import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '../../../../../environments/environment';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class LandingPageComponent {
  constructor(private deviceService: DeviceDetectorService,
  ) {}

  get isMobile() {
    return this.deviceService.isMobile();
  }

  get isAndroid() {
    return environment.android;
  }
}
