import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ChatWindowBaseComponent } from '~/modules/chat/components/chat-window/chat-window.base.component';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { ClientService } from '~/core/services/user/client';
import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-chat-window-mobile',
  templateUrl: './chat-window-mobile.component.html',
  styleUrls: ['./chat-window-mobile.component.scss'],
})
export class ChatWindowMobileComponent extends ChatWindowBaseComponent implements OnInit {
  // @ViewChild('chatInput', { static: false }) inputEl: ElementRef;
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

  // get input(): HTMLDivElement {
  //   return this.inputEl.nativeElement;
  // }
}
