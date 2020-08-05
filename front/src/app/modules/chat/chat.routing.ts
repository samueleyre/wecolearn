import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatWindowPageComponent } from '~/modules/chat/pages/current-thread-mobile/component';

import { ChatPageComponent } from './pages/chat/component';


const routes: Routes = [
  { path: '', component: ChatPageComponent, pathMatch: 'full' },
  { path: ':userId', component: ChatPageComponent },
  { path: 'current/:userId', component: ChatWindowPageComponent, pathMatch: 'full' },
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
