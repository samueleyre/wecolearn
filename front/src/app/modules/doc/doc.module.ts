import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRouting } from '~/modules/doc/doc.routing';
import { FooterModule } from '~/shared/modules/footer/footer.module';
import { ContainerComponent } from '~/core/layouts/main/component';

import { MentionsComponent } from './pages/mentionslegales/component';
import { PeerLearningComponent } from './pages/peerLearning/component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';


@NgModule({

  declarations: [
    ContainerComponent,
    AboutUsComponent,
    MentionsComponent,
    PeerLearningComponent,
    CookiePolicyComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    DocRouting,
    FooterModule,
  ],
})
export class DocModule {
}
