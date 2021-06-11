import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatWindowPageComponent } from '~/modules/chat/pages/current-thread-mobile/component';
import { ChatDesktopComponent } from '~/modules/chat/pages/chat/chat-desktop/chat-desktop.component';
import { ChatMobileComponent } from '~/modules/chat/pages/chat/chat-mobile/chat-mobile.component';

import { ChatComponentBase } from './pages/chat/chat.component.base';

const routes: Routes = [
  { path: 'list', data: { surface: ['desktop'] }, component: ChatDesktopComponent, pathMatch: 'full' },
  { path: 'list/mobile', data: { surface: ['mobile', 'android'] }, component: ChatMobileComponent, pathMatch: 'full' },
  { path: 'list/:userId', component: ChatComponentBase },
  { path: 'current/:userId', component: ChatWindowPageComponent, pathMatch: 'full' },

  { path: '', redirectTo: 'list', pathMatch: 'full' },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ChatRouting {
}
