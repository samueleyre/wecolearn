import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookiePolicyComponent } from '~/modules/doc/pages/cookie-policy/cookie-policy.component';
import { AboutUsComponent } from '~/modules/doc/pages/about-us/about-us.component';
import { ManifestComponent } from '~/modules/doc/pages/manifest/manifest.component';

import { MentionsComponent } from './pages/mentionslegales/component';
import { PeerLearningComponent } from './pages/peerLearning/component';


const routes: Routes = [
  { path: 'mentionslegales', component: MentionsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'peer-learning', component: PeerLearningComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
  { path: 'manifest', component: ManifestComponent },
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
