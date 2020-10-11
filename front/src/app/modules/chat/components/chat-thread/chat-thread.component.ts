import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { Thread } from '~/core/entities/thread/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';

import { ThreadsService } from '../../../../core/services/chat/threads.service';
import {CurrentThreadService} from "~/core/services/chat/currentThread.service";


@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss'],
})
export class ChatThreadComponent extends DestroyObservable implements OnInit {
  selected = false;
  public _thread: Thread;

  @Input('thread')
  set thread(value: Thread) {
    this._thread = value;
  }


  constructor(public threadsService: ThreadsService) {
    super();
  }

  ngOnInit(): void {
    if (this._thread.id) {
      this.load();
    }
  }

  load(): void {
    CurrentThreadService.currentThread
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this._thread && (currentThread.id === this._thread.id);
      });
  }

  loadMessages(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this._thread);
  }
}
