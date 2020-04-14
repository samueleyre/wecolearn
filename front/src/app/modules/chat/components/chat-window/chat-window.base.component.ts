import {
  Component,
  ElementRef,
  OnInit, ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { NgxLinkifyjsService, NgxLinkifyOptions } from 'ngx-linkifyjs';
import * as _ from 'lodash';
import { NgModel } from '@angular/forms';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/user/client';
import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { CHAT } from '~/modules/chat/config/chat.const';

import { MessagesService } from '../../services/messages';
import { Threads } from '../../services/threads';

@Component({
  template: '',
})
export class ChatWindowBaseComponent extends DestroyObservable implements OnInit {
  messages$: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User = null;
  disabled = false;
  loading = true;
  @ViewChild('message', { static: false }) messageModel:NgModel;

  options: NgxLinkifyOptions =
    {
      ignoreTags: ['a'],
    };

  constructor(public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              public el: ElementRef,
              private linkifyService: NgxLinkifyjsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.messages$ = this.threadsService.currentThreadMessages.pipe(
      takeUntil(this.destroy$),
    );
    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.loading = true;
        this.currentThread = thread;
        MenuMobileService.discussingUser.next(thread.name);

        // mark threads as read when seen by user
        this.messagesService.pushUpdatedMessages().subscribe();
      });


    this.currentUser = this.clientService.me;

    this.messages$
      .subscribe(
        (messages: Message[]) => {
          setTimeout(() => {
            this.scrollToBottom();
            this.loading = false;
          });
        });
  }

  onEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      this.onSendTrigger();
      event.preventDefault();
    }
  }

  private replaceTxtNotInA(message) {
    // just to make the txt parse easily, without (start) or (ends) issue
    let regexMessage = `>${message}<`;

    // parse txt between > and < but not follow with</a
    regexMessage = regexMessage.replace(/>([^<>]+)(?!<\/a)</g, (match, text) => {
      // now replace the txt
      return `>${_.unescape(this.linkifyService.linkify(text, this.options))}<`;
    });

    // remove the head > and tail <
    return regexMessage.substring(1, regexMessage.length - 1);
  }

  onSendTrigger(): void {
    console.log(this.messageModel);
    if (!this.messageModel.valid) {
      return;
    }
    let message = this.draftMessage.message;
    let foundBreak = CHAT.spaceRegex.exec(message);
    while (foundBreak !== null) {
      message = message.replace(CHAT.spaceRegex, '');
      foundBreak = CHAT.spaceRegex.exec(message);
    }
    console.log(message.length);

    if (message === '') {
      return;
    }
    message = this.replaceTxtNotInA(message);
    this.sendMessage(
      new Message({ ...this.draftMessage, message }),
    );
  }

  private sendMessage(message: Message): void {
    this.disabled = true;
    message.receiver = new User({ id: this.currentThread.id });
    message.is_read = false;
    setTimeout(
      () => {
        this.disabled = false;
        message.sender = new User(
          {
            id: this.currentUser.id,
            first_name: this.currentUser.first_name,
            last_name: this.currentUser.last_name,
            image: this.currentUser.image,
          });
        message.thread = {
          ...this.currentThread,
        };
        this.messagesService.addMessage(message);
        this.draftMessage = new Message();
        setTimeout(() => this.input.focus(), 0);
      },
      // tslint:disable-next-line:no-magic-numbers
      400,
    );
    this.messagesService.post(message)
      .subscribe(
        (answer) => {},
        (error) => {
          console.error('Message not sent properly');
        });
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-window-messages');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  closeChat(): void {
    this.currentThread = new Thread();
    this.threadsService.setCurrentThread(this.currentThread);
  }

  get input(): HTMLDivElement {
    return <HTMLDivElement>document.getElementsByClassName('ql-editor')[0];
  }
}
