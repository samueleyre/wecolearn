import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';

import { ThreadsService } from './../../../../service/threads.service';
import { MessagesService } from './../../../../service/messages';
import { ClientService } from './../../../../service/client';

import { Message } from './../../../../entities/message/entity';
import { Thread } from './../../../../entities/thread/entity';
import { Client } from './../../../../entities/client/entity';


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: Client;
  incoming: boolean;

  constructor(
      public ClientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.ClientService.get()
      .subscribe(
        (user: Client) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.id !== user.id;
          }
        });
  }
}
