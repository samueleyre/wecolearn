import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/client';
import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';

import { MessagesService } from '../../services/messages';
import { Threads } from '../../services/threads';


@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})


export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentMessages: Message[];
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User = null;
  disabled = false;
  @ViewChild('chatInput', { static: false }) inputEl: ElementRef;


  constructor(public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              public el: ElementRef,
              private deviceService: DeviceDetectorService,
  ) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
        (thread: Thread) => {
          this.currentThread = thread;

          // mark threads as read when seen by user
          this.messagesService.pushUpdatedMessages().subscribe();
        });


    const currentUser = this.clientService.getCli();

    if (currentUser) {
      this.currentUser = currentUser;
      MenuMobileService.discussingUser.next(currentUser);
    } else {
      this.clientService.get()
          .subscribe(
              (user: User) => {
                this.currentUser = user;
                MenuMobileService.discussingUser.next(user);
              });
    }


    this.messages
        .subscribe(
            (messages: Message[]) => {
              if (messages.length > 0) {
                this.currentMessages = messages;
              }
              // console.log("messages" ,this.messages)
              setTimeout(() => {
                if (this.currentThread.id) {
                  this.scrollToBottom();
                }
              });
            });
  }


  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    if (this.draftMessage.message !== null && this.draftMessage.message !== '' && this.currentThread.id) {
      this.disabled = true;
      this.draftMessage.receiver = new User({ id: this.currentThread.id });
      this.draftMessage.is_read = false;
      this.messagesService.post(this.draftMessage)
          .subscribe(
            (answer) => {
              this.disabled = false;
              this.draftMessage.sender = new User({ id: this.currentUser.id });
              this.draftMessage.thread = {
                ...this.currentThread,
              };
              this.messagesService.addMessage(this.draftMessage);
              this.draftMessage = new Message();
              setTimeout(() => this.inputEl.nativeElement.focus(), 0);
            });
    }
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
        .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }


  draftMessageChange(event: any) {
      // ?
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  closeChat(): void {
    this.currentThread = new Thread();
    this.threadsService.setCurrentThread(this.currentThread);
  }
}
