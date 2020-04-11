import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';

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
    PipesModule,

  ],
  providers: [
  ],
})
export class ProfileImageModule {
}
