import {
  Component,
  OnInit,
} from '@angular/core';

import { ChatMessageBaseComponent } from '../chat-message.base.component';


@Component({
  selector: 'chat-message-mobile',
  templateUrl: './chat-message-mobile.component.html',
  styleUrls: ['./chat-message-mobile.component.scss'],
})
export class ChatMessageMobileComponent extends ChatMessageBaseComponent implements OnInit {
}
