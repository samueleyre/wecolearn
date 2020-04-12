import {
  Component,
  OnInit,
  Input, SecurityContext,
} from '@angular/core';
import * as moment from 'moment';

import { Message } from '~/core/entities/message/entity';
import { CHAT } from '~/modules/chat/config/chat.const';


@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() private previousMessage: Message | null;
  @Input() clientId: Number = null;
  public msgContainerClass: string;
  public sameSenderAndRecent = false;

  ngOnInit(): void {
    console.log(this.previousMessage);
    if (this.previousMessage && this.message.sender.id === this.previousMessage.sender.id) {
      // tslint:disable-next-line:no-magic-numbers
      this.sameSenderAndRecent = moment(this.message.created)
        .diff(this.previousMessage.created, 'minute') < CHAT.maxTimeBetweenJoinMessages;
      console.log(moment(this.message.created).diff(this.previousMessage.created, 'minute'));
      console.log(this.sameSenderAndRecent);
    }


    if (this.message.sender && this.message.sender.id === this.clientId) {
      this.msgContainerClass = 'base-receive';
    } else if (this.message.receiver && this.message.receiver.id === this.clientId) {
      this.msgContainerClass = 'base-sent';
    } else {
      this.msgContainerClass = 'info-message';
    }
  }
}
