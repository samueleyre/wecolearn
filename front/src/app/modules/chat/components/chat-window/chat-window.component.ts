import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, takeUntil, tap } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/client';
import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { DestroyObservable } from '~/core/components/destroy-observable';

import { MessagesService } from '../../services/messages';
import { Threads } from '../../services/threads';


@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})


export class ChatWindowComponent extends DestroyObservable implements OnInit {
  messages: Observable<any>;
  currentMessages: Message[];
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User = null;
  disabled = false;
  loading = true;
  @ViewChild('chatInput', { static: false }) inputEl: ElementRef;


  constructor(public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              public el: ElementRef,
              private deviceService: DeviceDetectorService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages.pipe(takeUntil(this.destroy$));
    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
        MenuMobileService.discussingUser.next(thread.name);

        // mark threads as read when seen by user
        this.messagesService.pushUpdatedMessages().subscribe();
      });


    this.currentUser = this.clientService.getCli();

    this.messages
      .subscribe(
        (messages: Message[]) => {
          if (messages.length > 0) {
            this.currentMessages = messages;
          }
          setTimeout(() => {
            if (this.currentThread.id) {
              this.scrollToBottom();
              this.loading = false;
            } else {
              this.loading = false;
            }
          });
        });
  }

  onEnter(event: any): void {
    if (this.draftMessage.message === null ||
      this.draftMessage.message === '' ||
      !this.currentThread.id) {
      return;
    }
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    this.disabled = true;
    this.draftMessage.receiver = new User({ id: this.currentThread.id });
    this.draftMessage.is_read = false;
    setTimeout(
      () => {
        this.disabled = false;
        this.draftMessage.sender = new User({ id: this.currentUser.id });
        this.draftMessage.thread = {
          ...this.currentThread,
        };
        this.messagesService.addMessage(this.draftMessage);
        this.draftMessage = new Message();
        setTimeout(() => this.inputEl.nativeElement.focus(), 0);
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
    const scrollPane: any = this.el
        .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  closeChat(): void {
    this.currentThread = new Thread();
    this.threadsService.setCurrentThread(this.currentThread);
  }
}
