import { Component, Input } from '@angular/core';

import { User } from '~/core/entities/user/entity';
import { Thread } from '~/core/entities/thread/entity';
import { Threads } from '~/core/services/chat/threads';
import { WcRouterService } from '~/core/services/wc-router.service';

@Component({
  selector: 'open-thread',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class OpenThreadComponent {
  @Input() user: User;
  @Input() style;

  constructor(private _threadsService: Threads, private _wcRouter: WcRouterService) {}

  openThread() {
    const thread = new Thread({ id: this.user.id, name: this.user.first_name, image: this.user.image });
    this._wcRouter.navigateToCurrentDiscussion(this.user.id, this._threadsService.setCurrentThread(thread));
  }
}
