import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { Message } from '~/core/entities/message/entity';


@Component({
  selector: 'chat-message-mobile',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageMobileComponent implements OnInit {
  @Input() message: Message;
  incoming = false;
  public msgContainerClass: string;
  @Input() private previousMessageDate: Date;
  @Input() private previousMessageIncoming: boolean;
  @Input() clientId: Number = null;
  public different: Number = 0;

  constructor() {
    //
  }

  ngOnInit(): void {
    const different = (new Date(this.message['created']).valueOf() - new Date(this.previousMessageDate).valueOf()) / (24 * 60 * 60 * 1000); // tslint:disable-line no-magic-numbers max-line-length

    this.different = (different === 0 || (different > 1 || !this.previousMessageIncoming)) ? 1 : 0;

    if (this.message.sender && this.message.sender.id === this.clientId) {
      this.msgContainerClass = 'base-receive';
    } else if (this.message.receiver && this.message.receiver.id === this.clientId) {
      this.msgContainerClass = 'base-sent';
    } else {
      this.msgContainerClass = 'info-message';
    }


    (this['msgContainerClass'] === 'base-receive') ? this.incoming = true : this.incoming = false;
  }
}
