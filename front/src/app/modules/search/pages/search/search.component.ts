import {
  Component,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  templateUrl: 'search.component.html',
})export class SearchComponent {
  constructor(
    private deviceService: DeviceDetectorService,
  ) {
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }
}

