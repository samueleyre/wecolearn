import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Thread } from '~/core/entities/thread/entity';
import { UrlService } from '~/core/services/url';
import { NAV } from '~/config/navigation/nav';

import { Threads } from '../../services/threads';


@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss'],
})
export class ChatThreadComponent implements OnInit {
  selected = false;
  public webPath: string;
  public _thread: Thread;

  @Input('thread')
  set thread(value: Thread) {
    this._thread = value;
  }


  constructor(public threadsService: Threads, private router: Router, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.webPath = UrlService.updateUrl('/');
    if (this._thread.id) {
      this.load();
    }
  }

  load(): void {
    this.threadsService.currentThread
        .subscribe((currentThread: Thread) => {
          this.selected = currentThread &&
              this._thread &&
              (currentThread.id === this._thread.id);
        });
  }

  loadMessages(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this._thread);
    if (this.deviceService.isMobile()) {
      this.router.navigate([NAV.currentDiscussion]);
    }
  }
}
