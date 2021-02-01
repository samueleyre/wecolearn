import {
    Component, OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { ThreadsService } from '~/core/services/chat/threads.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'app-chat',
  template: '',
})

export class ChatComponentBase extends DestroyObservable implements OnInit, OnDestroy {
  constructor(
    private threadsService: ThreadsService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        if (params.has('userId')) {
          this.threadsService.setThreadById(Number(params.get('userId')));
          this.router.navigate(
            [NAV.discussion], {
              queryParams: {},
              queryParamsHandling: 'merge',
            });
        }
      });
  }

  get loading(): boolean {
    return this.messagesService.loading;
  }

  get emptyChat(): boolean {
    return this.threadsService.orderedThreads$.value.length === 0;
  }
}
