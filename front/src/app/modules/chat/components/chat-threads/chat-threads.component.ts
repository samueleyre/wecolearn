import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Thread } from '~/core/entities/thread/entity';
import { Logged } from '~/core/services/logged';

import { Threads } from '../../services/threads';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss'],
})
export class ChatThreadsComponent {
  threads: BehaviorSubject<Thread[]> =
      new BehaviorSubject<Thread[]>([]);

  constructor(public threadsService: Threads) {

  }

  ngOnInit(): void {
    this.threads = this.threadsService.newThreadsSubject;
    Logged.get().subscribe((logged: boolean) => {
      if (!logged) {
        this.threadsService.resetThreads();
      }
    });
  }
}
