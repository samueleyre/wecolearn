import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookiePolicyComponent } from '~/modules/doc/pages/cookie-policy/cookie-policy.component';

import { MentionsComponent } from './pages/mentionslegales/component';
import { AboutComponent } from './pages/about/component';
import { PeerLearningComponent } from './pages/peerLearning/component';
import { ContainerComponent } from '../../core/layouts/main/component';


const routes: Routes = [
  { path: 'mentionslegales', component: MentionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'peer-learning', component: PeerLearningComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class DocRouting {
}
