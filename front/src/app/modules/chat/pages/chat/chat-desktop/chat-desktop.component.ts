import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThreadsService } from '~/core/services/chat/threads.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { ChatComponentBase } from '~/modules/chat/pages/chat/chat.component.base';

@Component({
  selector: 'app-chat-desktop',
  templateUrl: './chat-desktop.component.html',
  styleUrls: ['./chat-desktop.component.scss'],
})
export class ChatDesktopComponent extends ChatComponentBase implements OnInit {
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
