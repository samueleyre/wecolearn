import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Thread } from '~/shared/entities/thread/entity';
import { Logged } from '~/shared/services/logged';

import { Threads } from '../../services/threads';

@Component({
  selector: 'chat-threads-mobile',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ChatThreadsMobileComponent {
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
