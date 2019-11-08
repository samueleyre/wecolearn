import {
    Component,
    OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

import { NAV } from '~/config/navigation/nav';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class ChatWindowPageComponent implements OnInit {
  constructor(public router: Router, private deviceService: DeviceDetectorService) {
    if (!this.deviceService.isMobile()) {
      this.router.navigate([NAV.discussion]);
    }
  }

  ngOnInit() {
  }
}
