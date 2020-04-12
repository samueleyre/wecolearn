import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/user/client';
import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';

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


  constructor(public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              public el: ElementRef,
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
      this.draftMessage.message = this.draftMessage.message.replace(/<p><br><\/p>/gim, '');
      this.sendMessage();
      event.preventDefault();
    }
    if (event.code === 'Enter' && event.ctrlKey) {
      if (this.draftMessage.message === null) this.draftMessage.message = '';
      else this.draftMessage.message += '<br>\n';
    }
  }

  sendMessage(): void {
    if (
      this.draftMessage.message === null
      || this.draftMessage.message === ''
      || !this.currentThread.id
    ) {
      return;
    }
    this.disabled = true;
    this.draftMessage.receiver = new User({ id: this.currentThread.id });
    this.draftMessage.is_read = false;
    setTimeout(
      () => {
        this.disabled = false;
        this.draftMessage.sender = new User(
          {
            id: this.currentUser.id,
            first_name: this.currentUser.first_name,
            last_name: this.currentUser.last_name,
            image: this.currentUser.image,
          });
        this.draftMessage.thread = {
          ...this.currentThread,
        };
        this.messagesService.addMessage(this.draftMessage);
        this.draftMessage = new Message();
        setTimeout(() => this.input.focus(), 0);
      },
      // tslint:disable-next-line:no-magic-numbers
      400,
    );
    this.messagesService.post(this.draftMessage)
      .subscribe(
        (answer) => {},
        (error) => {
          console.error('Message not sent properly');
        });
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-window-messages');
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }

  closeChat(): void {
    this.currentThread = new Thread();
    this.threadsService.setCurrentThread(this.currentThread);
  }

  get input(): HTMLDivElement {
    return <HTMLDivElement>document.getElementsByClassName('ql-editor')[0];
  }
}
