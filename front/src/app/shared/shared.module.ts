import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { CopyComponent } from '~/shared/components/copy/component';
import { HideMenuMobileOnFocusDirective } from '~/shared/directives/hide-menu-mobile-on-focus.directive';
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';

@NgModule({
  declarations: [
    CopyComponent,
    HideMenuMobileOnFocusDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    ProfileImageModule,
    PipesModule,
  ],
  exports: [
    CommonModule,
    ProfileImageModule,
    CopyComponent,
    HideMenuMobileOnFocusDirective,
  ],
})
export class SharedModule {}
