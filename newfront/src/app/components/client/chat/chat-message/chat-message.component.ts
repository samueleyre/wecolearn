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
import { User } from '../../../../entities/user/entity';
import {GPPDComponent} from "../../../../component/gppd";
import {image} from "../../../../../applicativeService/constants/image";


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  incoming: boolean = false;
  private avatarSrcBase : string;
  private msgContainerClass: string;
  private baseImageName : string = image.default_200px;
  @Input() private previousMessageDate : Date;
  @Input() private previousMessageIncoming: boolean;
  @Input() clientId : Number = null;
  private different: Number = 0;

  constructor( public ClientService: ClientService ) {
  }

  ngOnInit(): void {

    this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');

    let different = (new Date(this.message['created']).valueOf() - new Date(this.previousMessageDate).valueOf()) / (24*60*60*1000);
    this.different = ( different === 0 || ( different > 1 || !this.previousMessageIncoming)) ? 1 : 0;


    if (this.message.sender) {
      // if (this.message.sender.id == this.clientId) { // doesn't actually happen
      //    this.msgContainerClass = 'base-sent';
      // } else {
         this.msgContainerClass = 'base-receive';
      // }
    }

    if (this.message.receiver) {
        // if (this.message.receiver.id == this.clientId) { // doesn't actually happen
        //     this.msgContainerClass = 'base-receive';
        // } else {
            this.msgContainerClass = 'base-sent';
        // }
    }

    (this['msgContainerClass'] === "base-receive") ? this.incoming = true : this.incoming = false;


  }

}
