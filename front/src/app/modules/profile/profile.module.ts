import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';
import { OpenThreadModule } from '~/modules/chat/modules/openThread/openThread.module';
import { PasswordDifficultyModule } from '~/modules/auth/modules/passwordDifficulty/passwordDifficulty.module';
import { ShowProfilSettingsComponent } from '~/modules/profile/components/showProfil/component';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { SharedModule } from '~/shared/shared.module';

import { ProfileComponent } from './components/profile/component';
import { ProfilePageComponent } from './pages/profile/component';
import { ProfileSettingsComponentBase } from './components/profileSettings/profile-settings.component.base';
import { SettingsPageComponent } from './pages/settings/component';
import { SettingsComponent } from './components/settings/component';
import { ProfileFormModule } from './modules/form/form.module';
import { ProfileSettingsPageComponent } from './pages/profileSettings/component';
import { ProfileRouting } from './profile.routing';
import { ToggleComponent } from './components/toggle/component';
import { EmailNotificationSettingsComponent } from './components/notifications/component';
import { ProfileImageModule } from './modules/profilImage/profileImage.module';
import { ProfileSettingsDesktopComponent } from './components/profileSettings/profile-settings-desktop/profile-settings-desktop.component';
import { ProfileSettingsMobileComponent } from './components/profileSettings/profile-settings-mobile/profile-settings-mobile.component';


@NgModule({

  declarations: [
    ProfileComponent,
    ProfilePageComponent,
    ProfileSettingsComponentBase,
    ProfileSettingsPageComponent,
    SettingsPageComponent,
    SettingsComponent,
    ToggleComponent,
    EmailNotificationSettingsComponent,
    ShowProfilSettingsComponent,
    ProfileSettingsDesktopComponent,
    ProfileSettingsMobileComponent,
  ],
  exports: [
    ProfileImageModule,
  ],
  imports: [
    CommonModule,
    ProfileImageModule,
    ProfileRouting,
    FormsModule,
    PipesModule,
    CloudinaryModule,
    OpenThreadModule,
    ProfileFormModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordDifficultyModule,
    MaterialModule,
    IonicModule,
    SharedModule,
  ],
})
export class ProfileModule {
}
