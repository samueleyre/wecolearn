import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

import { Thread } from '~/core/entities/thread/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';

import { ThreadsService } from '../../../../core/services/chat/threads.service';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss'],
})
export class ChatThreadsComponent extends DestroyObservable {
  threads$: Observable<Thread[]>;

  constructor(public threadsService: ThreadsService) {
    super();
  }

  ngOnInit(): void {
    this.threads$ = this.threadsService.orderedThreads$.pipe(
      delay(0),
      takeUntil(this.destroy$),
    );
  }
}
