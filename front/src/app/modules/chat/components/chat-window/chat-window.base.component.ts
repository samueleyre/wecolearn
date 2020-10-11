import {
  Component,
  ElementRef,
  OnInit, ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { NgxLinkifyjsService, NgxLinkifyOptions } from 'ngx-linkifyjs';
import * as _ from 'lodash';
import { NgModel } from '@angular/forms';

import { User } from '~/core/entities/user/entity';
import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { CHAT } from '~/modules/chat/config/chat.const';
import { ProfileService } from '~/core/services/user/profile.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { ThreadsService } from '~/core/services/chat/threads.service';
import { CurrentThreadService } from '~/core/services/chat/currentThread.service';


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
              public threadsService: ThreadsService,
              public profileService: ProfileService,
              public el: ElementRef,
              private linkifyService: NgxLinkifyjsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.messages$ = this.threadsService.currentThreadMessages.pipe(
      // filter bot messages ( id === -1 )
      map((messages: Message[]) => messages.filter(message => message.id !== -1)),
      takeUntil(this.destroy$),
    );
    this.draftMessage = new Message();

    CurrentThreadService.currentThread.subscribe(
      (thread: Thread) => {
        this.loading = true;
        this.currentThread = thread;

        // mark threads as read when seen by user
        this.messagesService.markThreadAsRead.next(thread);
        this.messagesService.pushUpdatedMessages().subscribe();
      });

    this.currentUser = this.profileService.profile;

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
    if (!this.messageModel.valid) {
      return;
    }
    let message = this.draftMessage.message;
    let foundBreak = CHAT.spaceRegex.exec(message);
    while (foundBreak !== null) {
      message = message.replace(CHAT.spaceRegex, '');
      foundBreak = CHAT.spaceRegex.exec(message);
    }

    if (message === '') {
      return;
    }
    message = this.replaceTxtNotInA(message);
    this.sendMessage(
      new Message({ ...this.draftMessage, message }),
    );
    this.input.focus();
    this.draftMessage = new Message();
  }

  private sendMessage(message: Message): void {
    message.receiver = new User({ id: this.currentThread.id });
    message.is_read = false;
    setTimeout(
      () => {
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

  get placeHolder(): string {
    return `Ecrire quelque chose à ${this.currentThread.name}`;
  }

  get input(): HTMLDivElement {
    return <HTMLDivElement>document.getElementsByClassName('ql-editor')[0];
  }
}
