import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { FromNowPipe } from '~/modules/chat/pipes/fromNowPipe/pipe';
import { ChatWindowPageComponent } from '~/modules/chat/pages/chatWindow/component';
import { ChatThreadsMobileComponent } from '~/modules/chat/components/chat-threads-mobile/component';
import { ChatThreadMobileComponent } from '~/modules/chat/components/chat-thread-mobile/component';
import { ChatMessageMobileComponent } from '~/modules/chat/components/chat-message-mobile/chat-message.component';

import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatPageComponent } from './pages/chat/component';
import { ChatRouting } from './chat.routing';


@NgModule({

  declarations: [
    ChatPageComponent,
    ChatMessageComponent,
    ChatMessageMobileComponent,
    ChatThreadComponent,
    ChatThreadMobileComponent,
    ChatThreadsComponent,
    ChatThreadsMobileComponent,
    ChatWindowComponent,
    FromNowPipe,
    ChatWindowPageComponent,
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRouting,
    ProfileImageModule,
    DeviceDetectorModule.forRoot(),
  ],
  providers: [
  ],
})
export class ChatModule {
}
