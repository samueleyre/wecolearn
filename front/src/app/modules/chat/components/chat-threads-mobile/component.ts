import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { Thread } from '~/core/entities/thread/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';

import { Threads } from '../../../../core/services/chat/threads';

@Component({
  selector: 'chat-threads-mobile',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ChatThreadsMobileComponent extends DestroyObservable {
  threads$: Observable<Thread[]>;

  constructor(public threadsService: Threads) {
    super();
  }

  ngOnInit(): void {
    this.threads$ = this.threadsService.orderedThreads$.pipe(
      delay(0),
      takeUntil(this.destroy$),
    );
  }
}
