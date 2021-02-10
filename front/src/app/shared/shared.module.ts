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

import { NoConnectionToastComponent } from './components/no-connection-toast/no-connection-toast.component';
import { AndroidLinkComponent } from './components/android-link/android-link.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { SavingInputComponent } from './components/saving-input/saving-input.component';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    CopyComponent,
    HideMenuMobileOnFocusDirective,
    NoConnectionToastComponent,
    AndroidLinkComponent,
    EmojiComponent,
    SavingInputComponent,
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
              MatProgressSpinnerModule,
            ],
  exports: [
    CommonModule,
    ProfileImageModule,
    CopyComponent,
    EmojiComponent,
    HideMenuMobileOnFocusDirective,
    AndroidLinkComponent,
    SavingInputComponent,
  ],
  entryComponents: [NoConnectionToastComponent],
})
export class SharedModule {}
