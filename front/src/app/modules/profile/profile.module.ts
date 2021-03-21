import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CloudinaryModule } from '~/shared/modules/cloudinary/cloudinary.module';
import { OpenThreadModule } from '~/modules/chat/modules/openThread/openThread.module';
import { PasswordDifficultyModule } from '~/modules/auth/modules/passwordDifficulty/passwordDifficulty.module';
import { ShowProfilSettingsComponent } from '~/modules/profile/components/showProfil/component';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { SharedModule } from '~/shared/shared.module';
import { ProfileSettingsComponentBase } from '~/modules/profile/pages/profileSettings/profile-settings.component.base';
import { ProfileSettingsDesktopComponent } from '~/modules/profile/pages/profileSettings/profile-settings-desktop/profile-settings-desktop.component';
import { ProfileSettingsMobileComponent } from '~/modules/profile/pages/profileSettings/profile-settings-mobile/profile-settings-mobile.component';

import { ProfileComponent } from './components/profile/component';
import { ProfileComponentBase } from './pages/profile/profile.component.base';
import { SettingsComponentBase } from './pages/settings/settings.component.base';
import { SettingsComponent } from './components/settings/component';
import { ProfileFormModule } from './modules/form/form.module';
import { ProfileRouting } from './profile.routing';
import { ToggleComponent } from './components/toggle/component';
import { EmailNotificationSettingsComponent } from './components/notifications/component';
import { ProfileImageModule } from './modules/profilImage/profileImage.module';
import { SettingsMobileComponent } from './pages/settings/settings-mobile/settings-mobile.component';
import { SettingsDesktopComponent } from './pages/settings/settings-desktop/settings-desktop.component';
import { ProfileDesktopComponent } from './pages/profile/profile-desktop/profile-desktop.component';
import { ProfileMobileComponent } from './pages/profile/profile-mobile/profile-mobile.component';


@NgModule({

  declarations: [
    ProfileComponent,
    ProfileComponentBase,
    SettingsComponentBase,
    SettingsComponent,
    ToggleComponent,
    EmailNotificationSettingsComponent,
    ShowProfilSettingsComponent,
    ProfileSettingsComponentBase,
    ProfileSettingsDesktopComponent,
    ProfileSettingsMobileComponent,
    SettingsMobileComponent,
    SettingsDesktopComponent,
    ProfileDesktopComponent,
    ProfileMobileComponent,
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
