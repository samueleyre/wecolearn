import { Component, ElementRef, OnInit } from '@angular/core';

import { ChatWindowBaseComponent } from '~/modules/chat/components/chat-window/chat-window.base.component';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { ClientService } from '~/core/services/user/client';

@Component({
  selector: 'app-chat-window-desktop',
  templateUrl: './chat-window-desktop.component.html',
  styleUrls: ['./chat-window-desktop.component.scss'],
})
export class ChatWindowDesktopComponent extends ChatWindowBaseComponent implements OnInit {
  constructor(
    public messagesService: MessagesService,
    public threadsService: Threads,
    public clientService: ClientService,
    public el: ElementRef,
  ) {
    super(messagesService, threadsService, clientService, el);
  }
}
