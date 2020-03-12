import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatWindowPageComponent } from '~/modules/chat/pages/chatWindow/component';

import { ChatPageComponent } from './pages/chat/component';


const routes: Routes = [
      { path: ':userId', component: ChatPageComponent },
      { path: '', component: ChatPageComponent, pathMatch: 'full' },
      { path: 'current/:userId', component: ChatWindowPageComponent },
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
