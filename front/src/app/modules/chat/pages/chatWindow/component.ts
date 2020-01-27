import {
  Component, OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

import { NAV } from '~/config/navigation/nav';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})
export class ChatWindowPageComponent implements OnInit {
  loading = true;
  constructor(private _router: Router, private _deviceService: DeviceDetectorService) {
    if (!this._deviceService.isMobile()) {
      this._router.navigate([NAV.discussion]);
    }
  }

  ngOnInit() {
    this.loading = false;
  }
}
