import {
  Component,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class SendPasswordConfirmationEmailPageComponent {
  constructor(private deviceService: DeviceDetectorService) {
    //
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}
