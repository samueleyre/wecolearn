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

import { Threads } from '../../services/threads';


@Component({
  selector: 'chat-thread-mobile',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ChatThreadMobileComponent extends DestroyObservable implements OnInit {
  selected = false;
  public _thread: Thread;

  @Input('thread')
  set thread(value: Thread) {
    this._thread = value;
  }

  constructor(public threadsService: Threads, private router: Router, private deviceService: DeviceDetectorService) {
    super();
  }

  ngOnInit(): void {
    if (this._thread.id) {
      this.load();
    }
  }

  load(): void {
    this.threadsService.currentThread
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this._thread && (currentThread.id === this._thread.id);
      });
  }

  loadMessages(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this._thread);
    this.router.navigate([NAV.currentDiscussion]);
  }
}
