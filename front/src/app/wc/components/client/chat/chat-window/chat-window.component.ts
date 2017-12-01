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
            if( this.currentThread.id ) {
              this.scrollToBottom();
            }
          });
        });

    this.messagesService.initTimer();

  }


  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    this.draftMessage.receiver= new Client(this.currentThread.id);
    this.draftMessage.is_read = false;
    this.messagesService.sendMessage(this.draftMessage)
      .subscribe(answer => {
        this.draftMessage.sender = new Client(this.currentUser.id);
        this.draftMessage.thread = new Thread(this.currentThread.id, this.currentThread.name, this.currentThread.avatarSrc);
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

  ngOnExit(): void {

    this.stopStream();
  }

  closeChat() : void {
    console.log("close chat !")
    this.currentThread = new Thread();

  }

  stopStream() :void {

    this.messagesService.stopNewMessageLoop();
  }
}
