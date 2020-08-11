import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';

import { Thread } from '~/core/entities/thread/entity';
import { NAV } from '~/config/navigation/nav';
import { DestroyObservable } from '~/core/components/destroy-observable';

import { ThreadsService } from '../../../../core/services/chat/threads.service';


@Component({
  selector: 'chat-thread-mobile',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ChatThreadMobileComponent extends DestroyObservable {
  selected = false;
  public _thread: Thread;

  @Input('thread')
  set thread(value: Thread) {
    this._thread = value;
  }

  constructor(public threadsService: ThreadsService, private router: Router) {
    super();
  }

  loadMessages(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this._thread);
    this.router.navigate([`${NAV.currentDiscussion}/${this._thread.id}`]);
  }
}
