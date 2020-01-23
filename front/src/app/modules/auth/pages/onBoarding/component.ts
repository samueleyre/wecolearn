import {
  Component,
  Injectable, OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class AuthOnboardingPageComponent implements OnInit {
  constructor(
    private deviceService: DeviceDetectorService,
  ) {
    //
  }

  ngOnInit(): void {
    //
  }


  get isMobile() {
    return this.deviceService.isMobile();
  }
}
