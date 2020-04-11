import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { QuillModule } from 'ngx-quill';

import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { FromNowPipe } from '~/modules/chat/pipes/fromNowPipe/pipe';
import { ChatWindowPageComponent } from '~/modules/chat/pages/current-thread-mobile/component';
import { ChatThreadsMobileComponent } from '~/modules/chat/components/chat-threads-mobile/component';
import { ChatThreadMobileComponent } from '~/modules/chat/components/chat-thread-mobile/component';
import { ChatMessageMobileComponent } from '~/modules/chat/components/chat-message-mobile/chat-message.component';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';

import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { ChatWindowBaseComponent } from './components/chat-window/chat-window.base.component';
import { ChatPageComponent } from './pages/chat/component';
import { ChatRouting } from './chat.routing';
import { ChatWindowDesktopComponent } from './components/chat-window/chat-window-desktop/chat-window-desktop.component';
import { ChatWindowMobileComponent } from './components/chat-window/chat-window-mobile/chat-window-mobile.component';


@NgModule({

  declarations: [
    ChatPageComponent,
    ChatMessageComponent,
    ChatMessageMobileComponent,
    ChatThreadComponent,
    ChatThreadMobileComponent,
    ChatThreadsComponent,
    ChatThreadsMobileComponent,
    ChatWindowBaseComponent,
    FromNowPipe,
    ChatWindowPageComponent,
    ChatWindowDesktopComponent,
    ChatWindowMobileComponent,
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRouting,
    ProfileImageModule,
    DeviceDetectorModule.forRoot(),
    QuillModule.forRoot(),
    PipesModule,
  ],
  providers: [
  ],
})
export class ChatModule {
}
