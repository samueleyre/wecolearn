import {
  Component,
  OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class SignupPageComponent implements OnInit {
  constructor(private deviceService: DeviceDetectorService) {
    //
  }

  ngOnInit() {
    //
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
