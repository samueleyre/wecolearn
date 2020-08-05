import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { QuillModule } from 'ngx-quill';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { MaterialModule } from '~/shared/modules/material/material.module';

import { FromNowPipe } from './pipes/fromNowPipe/pipe';
import { ChatWindowPageComponent } from './pages/current-thread-mobile/component';
import { ChatThreadsMobileComponent } from './components/chat-threads-mobile/component';
import { ChatThreadMobileComponent } from './components/chat-thread-mobile/component';
import { ChatMessageMobileComponent } from './components/chat-message/chat-message-mobile/chat-message-mobile.component';
import { ChatMessageBaseComponent } from './components/chat-message/chat-message.base.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { ChatWindowBaseComponent } from './components/chat-window/chat-window.base.component';
import { ChatPageComponent } from './pages/chat/component';
import { ChatRouting } from './chat.routing';
import { ChatWindowDesktopComponent } from './components/chat-window/chat-window-desktop/chat-window-desktop.component';
import { ChatWindowMobileComponent } from './components/chat-window/chat-window-mobile/chat-window-mobile.component';
import { ChatMessageDesktopComponent } from './components/chat-message/chat-message-desktop/chat-message-desktop.component';
import {IonicModule} from "@ionic/angular";


@NgModule({

  declarations: [
    ChatPageComponent,
    ChatMessageBaseComponent,
    ChatMessageDesktopComponent,
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
    ChatMessageDesktopComponent,
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
    MaterialModule,
    NgxLinkifyjsModule.forRoot(),
    IonicModule,

  ],
  providers: [
  ],
})
export class ChatModule {
}
