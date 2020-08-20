import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CopyComponent } from '~/shared/components/copy/component';
import { HideMenuMobileOnFocusDirective } from '~/shared/directives/hide-menu-mobile-on-focus.directive';
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { ConfirmDialogComponent } from '~/core/components/dialog/confirm-dialog.component';

import { NoConnectionToastComponent } from './components/no-connection-toast/no-connection-toast.component';

@NgModule({
  declarations: [
    CopyComponent,
    HideMenuMobileOnFocusDirective,
    NoConnectionToastComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileImageModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    ProfileImageModule,
    CopyComponent,
    HideMenuMobileOnFocusDirective,
    // NoConnectionToastComponent,
  ],
  entryComponents: [NoConnectionToastComponent],
})
export class SharedModule {}
