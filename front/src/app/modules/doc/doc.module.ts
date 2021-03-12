import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { DocRouting } from '~/modules/doc/doc.routing';
import { FooterModule } from '~/shared/modules/footer/footer.module';

import { PeerLearningComponent } from './pages/peerLearning/component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ManifestComponent } from './pages/manifest/manifest.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { DocPageLayoutComponent } from './layouts/doc-page-layout/doc-page-layout.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';


@NgModule({

  declarations: [
    AboutUsComponent,
    PeerLearningComponent,
    CookiePolicyComponent,
    ManifestComponent,
    CguComponent,
    DocPageLayoutComponent,
    MentionsLegalesComponent,
    PrivacyPolicyComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    DocRouting,
    FooterModule,
    MatIconModule,
  ],
})
export class DocModule {
}
