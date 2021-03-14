import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CopyComponent } from '~/shared/components/copy/component';
import { HideMenuMobileOnFocusDirective } from '~/shared/directives/hide-menu-mobile-on-focus.directive';
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { MaterialModule } from '~/shared/modules/material/material.module';

import { NoConnectionToastComponent } from './components/no-connection-toast/no-connection-toast.component';
import { AndroidLinkComponent } from './components/android-link/android-link.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { SavingInputComponent } from './components/saving-input/saving-input.component';

import { DashPageLayoutComponent } from '../shared/layouts/dash-page-layout/dash-page-layout.component';


@NgModule({
  declarations: [
    CopyComponent,
    HideMenuMobileOnFocusDirective,
    NoConnectionToastComponent,
    AndroidLinkComponent,
    EmojiComponent,
    SavingInputComponent,
    DashPageLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileImageModule,
    PipesModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    ProfileImageModule,
    CopyComponent,
    EmojiComponent,
    HideMenuMobileOnFocusDirective,
    AndroidLinkComponent,
    SavingInputComponent,
    MaterialModule,
    ReactiveFormsModule,
    DashPageLayoutComponent,
  ],
  entryComponents: [NoConnectionToastComponent],
})
export class SharedModule {}
