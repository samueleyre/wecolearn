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
import {GPPDComponent} from "../../../../component/gppd";


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  incoming: boolean;
  private avatarSrcBase : string;

  @Input() clientId : Number = null;


  constructor(
      public ClientService: ClientService
  ) {
  }


  ngOnInit(): void {

    this.avatarSrcBase =  GPPDComponent.updateUrl('/home/');

  }
}
