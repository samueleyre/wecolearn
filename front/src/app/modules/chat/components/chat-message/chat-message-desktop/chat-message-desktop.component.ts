import { Component, OnInit } from '@angular/core';

import { ChatMessageBaseComponent } from '../chat-message.base.component';

@Component({
  selector: 'app-chat-message-desktop',
  templateUrl: './chat-message-desktop.component.html',
  styleUrls: ['./chat-message-desktop.component.scss'],
})
export class ChatMessageDesktopComponent extends ChatMessageBaseComponent implements OnInit {
}
