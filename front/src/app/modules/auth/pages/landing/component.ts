import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class LandingPageComponent {
  constructor(private deviceService: DeviceDetectorService,
  ) {
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
