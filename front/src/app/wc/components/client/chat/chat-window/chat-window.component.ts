import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../../../../entities/client/entity';
import { MessagesService } from './../../../../service/messages';
import { ClientService } from './../../../../service/client';
import { ThreadsService } from './../../../../service/threads.service';
import { Thread } from '../../../../entities/thread/entity';
import { Message } from '../../../../entities/message/entity';


import { ChatExampleData } from './../../chat/data/chat-example-data';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: Client = null;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public ClientService: ClientService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.ClientService.get()
        .subscribe(
            (user: Client) => {
                this.currentUser = user;
        });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    this.draftMessage.receiver = new Client();
    this.draftMessage.receiver.id = this.currentThread.id;
    this.draftMessage.isRead = false;
    this.messagesService.sendMessage(this.draftMessage)
        .subscribe(answer => {
          this.draftMessage.sender = this.currentUser;
          this.draftMessage.thread = this.currentThread;
          this.messagesService.addMessage(this.draftMessage);
          this.draftMessage = new Message();
        });
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }


    draftMessageChange(event: any) {
      // console.log("change", event, this.draftMessage)
    }
}
