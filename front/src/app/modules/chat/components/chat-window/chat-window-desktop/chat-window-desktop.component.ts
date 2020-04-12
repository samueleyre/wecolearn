import { Component, ElementRef, OnInit } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js';

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
  public modules = {};

  constructor(
    public messagesService: MessagesService,
    public threadsService: Threads,
    public clientService: ClientService,
    public el: ElementRef,
  ) {
    super(messagesService, threadsService, clientService, el);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': {
        buttonIcon: '<mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" ' +
          'role="img" aria-hidden="true">sentiment_satisfied</mat-icon>',
      },
    };
  }
}
