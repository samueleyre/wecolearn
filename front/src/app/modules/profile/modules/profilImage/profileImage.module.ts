import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeUrlPipeModule } from '~/shared/modules/safeUrl/safeUrlPipe.module';

import { ProfilImageComponent } from './components/profilImage/component';
import { DefaultProfileImageDirective } from './directives/defaultProfileImage';


@NgModule({

  declarations: [
    ProfilImageComponent,
    DefaultProfileImageDirective,
  ],
  exports: [
    ProfilImageComponent,
    DefaultProfileImageDirective,
  ],
  imports: [
    CommonModule,
    SafeUrlPipeModule,

  ],
  providers: [
  ],
})
export class ProfileImageModule {
}
