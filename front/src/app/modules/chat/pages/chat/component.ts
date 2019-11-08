import {
    Component, OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Thread } from '~/core/entities/thread/entity';
import { Threads } from '~/modules/chat/services/threads';
import { MessagerieService } from '~/core/services/messagerie/service';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class ChatPageComponent implements OnInit, OnDestroy {
  available: boolean;
  subs: any;
  threads: BehaviorSubject<Thread[]> =
    new BehaviorSubject<Thread[]>([]);

  loading = true;

  constructor(public threadsService: Threads, private messagerieService: MessagerieService, private deviceService: DeviceDetectorService) {
//
  }

  ngOnInit() {
    this.threads = this.threadsService.newThreadsSubject;
    this.threads.subscribe(value => this.loading = false);

    this.subs = this.messagerieService.available().subscribe((available) => {
      this.available = available;
    });
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
