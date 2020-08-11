import {
  Component, OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { NAV } from '~/config/navigation/nav';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { ThreadsService } from '~/core/services/chat/threads.service';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ChatWindowPageComponent extends DestroyObservable implements OnInit {
  loading = true;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    private _threadsService: ThreadsService,
) {
    super();
    this._route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        if (params.has('userId')) {
          this._threadsService.setThreadById(Number(params.get('userId')));
        }
        if (!this._deviceService.isMobile()) {
          this._router.navigate([NAV.discussion]);
        }
      });
  }

  ngOnInit() {
    this.loading = false;
  }
}
