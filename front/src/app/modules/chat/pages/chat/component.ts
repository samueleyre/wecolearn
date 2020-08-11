import {
    Component, OnDestroy,
    OnInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ThreadsService } from '~/core/services/chat/threads.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'app-chat',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ChatPageComponent extends DestroyObservable implements OnInit, OnDestroy {
  constructor(
    private _threadsService: ThreadsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessagesService,
    private _deviceService: DeviceDetectorService,
  ) {
    super();
  }

  ngOnInit() {
    this._route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        if (params.has('userId')) {
          this._threadsService.setThreadById(Number(params.get('userId')));
          this._router.navigate(
            [NAV.discussion], {
              queryParams: {},
              queryParamsHandling: 'merge',
            });
        }
      });
  }

  get loading(): boolean {
    return this._messageService.loading;
  }

  get emptyChat(): boolean {
    return this._threadsService.orderedThreads$.value.length === 0;
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }
}
