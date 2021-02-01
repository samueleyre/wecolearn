import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatComponentBase } from '~/modules/chat/pages/chat/chat.component.base';
import { ThreadsService } from '~/core/services/chat/threads.service';
import { MessagesService } from '~/core/services/chat/messages.service';

@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['./chat-mobile.component.scss'],
})
export class ChatMobileComponent extends ChatComponentBase implements OnInit {
  constructor(
    private _threadsService: ThreadsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messagesService: MessagesService,
  ) {
    super(
      _threadsService,
      _route,
      _router,
      _messagesService,
    );
  }

  ngOnInit() {
  }
}
