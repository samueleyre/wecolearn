import {
    Component, OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Thread } from '~/core/entities/thread/entity';
import { Threads } from '~/modules/chat/services/threads';
import { MessagerieService } from '~/core/services/messagerie/service';
import { MessagesService } from '~/modules/chat/services/messages';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class ChatPageComponent implements OnInit, OnDestroy {
  available: boolean;
  subs: any;
  threads: BehaviorSubject<Thread[]> =
    new BehaviorSubject<Thread[]>([]);

  constructor(private _threadsService: Threads,
              private _messagerieService: MessagerieService,
              private _messageService: MessagesService,
              private _deviceService: DeviceDetectorService,
  ) {
//
  }

  ngOnInit() {
    this.threads = this._threadsService.orderedThreads$;

    this.subs = this._messagerieService.available().subscribe((available) => {
      this.available = available;
    });
  }

  get loading(): boolean {
    return this._messageService.loading;
  }

  get emptyChat(): boolean {
    return this.threads.value.length === 0;
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
