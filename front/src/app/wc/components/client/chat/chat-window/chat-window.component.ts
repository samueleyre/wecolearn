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
import {LoggerService} from "../../../../../applicativeService/logger/service";

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
  private disabled = false;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public ClientService: ClientService,
              public el: ElementRef,
              private loggerService: LoggerService
  ) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
          this.loggerService.log("currentthread", thread)
        if (thread.id) {
          this.messagesService.changePeriod(15000);
        }
        this.currentThread = thread;
      });


    // console.log("client - message iwndow", this.ClientService.getCli());

    let currentUser = this.ClientService.getCli()

    if (currentUser) {

          this.currentUser = currentUser;
    }

    this.ClientService.get()
        .subscribe(
            (user: Client) => {
              // console.log("got client - message window", user)
                this.currentUser = user;
        });

    // this.ClientService.getOb().subscribe(
    //   (user: Client) => {
    //       console.log("yoyo", user)
    //
    //   }
    // );


    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            if( this.currentThread.id ) {
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
    this.disabled = true;
    if (this.draftMessage.message !== null && this.draftMessage.message  !== '') {
      this.draftMessage.receiver= new Client(this.currentThread.id);
      this.draftMessage.is_read = false;
      this.messagesService.sendMessage(this.draftMessage)
          .subscribe(answer => {
            this.disabled = false;
            this.draftMessage.sender = new Client(this.currentUser.id);
            this.draftMessage.thread = new Thread(this.currentThread.id, this.currentThread.name, this.currentThread.avatarSrc);
            this.messagesService.addMessage(this.draftMessage);
            this.draftMessage = new Message();
          });
    }
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    // console.log("what's happening here ? ", scrollPane)
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }


  draftMessageChange(event: any) {
    // console.log("change", event, this.draftMessage)
  }

  ngOnExit(): void {

    // this.stopStream();
  }

  closeChat() : void {
    // console.log("close chat !")
    this.currentThread = new Thread();
    this.threadsService.setCurrentThread(this.currentThread);
    this.messagesService.changePeriod(120000);

  }

  stopStream() :void {

    this.messagesService.stopNewMessageLoop();
  }
}
