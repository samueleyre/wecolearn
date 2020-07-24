import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';

import { ChatWindowBaseComponent } from '~/modules/chat/components/chat-window/chat-window.base.component';
import { MessagesService } from '~/core/services/chat/messages';
import { Threads } from '~/core/services/chat/threads';
import { ClientService } from '~/core/services/user/client';

@Component({
  selector: 'app-chat-window-mobile',
  templateUrl: './chat-window-mobile.component.html',
  styleUrls: ['./chat-window-mobile.component.scss'],
})
export class ChatWindowMobileComponent extends ChatWindowBaseComponent implements OnInit {
  public modules = {};

  constructor(
    public messagesService: MessagesService,
    public threadsService: Threads,
    public clientService: ClientService,
    public el: ElementRef,
    private _linkifyService: NgxLinkifyjsService,
  ) {
    super(messagesService, threadsService, clientService, el, _linkifyService);
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

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-window');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
