import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmModule } from '~/shared/modules/popin/confirm/confirm.module';
import { TagPipeModule } from '~/shared/modules/tagPipes/tagPipe.module';
import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';
import { OpenThreadModule } from '~/modules/chat/modules/openThread/openThread.module';
import { PasswordDifficultyModule } from '~/modules/auth/modules/passwordDifficulty/passwordDifficulty.module';
import { ShowProfilSettingsComponent } from '~/modules/profile/components/showProfil/component';

import { ProfileComponent } from './components/profile/component';
import { ProfilePageComponent } from './pages/profile/component';
import { ProfileSettingsComponent } from './components/profileSettings/component';
import { SettingsPageComponent } from './pages/settings/component';
import { SettingsComponent } from './components/settings/component';
import { ProfileFormModule } from './modules/form/form.module';
import { ProfileSettingsPageComponent } from './pages/profileSettings/component';
import { ProfileRouting } from './profile.routing';
import { ToggleComponent } from './components/toggle/component';
import { ProfileService } from './services/profile';
import { EmailNotificationSettingsComponent } from './components/notifications/component';
import { ProfileImageModule } from './modules/profilImage/profileImage.module';


@NgModule({

  declarations: [
    ProfileComponent,
    ProfilePageComponent,
    ProfileSettingsComponent,
    ProfileSettingsPageComponent,
    SettingsPageComponent,
    SettingsComponent,
    ToggleComponent,
    EmailNotificationSettingsComponent,
    ShowProfilSettingsComponent,
  ],
  exports: [
    ProfileImageModule,
  ],
  imports: [
    CommonModule,
    ProfileImageModule,
    ProfileRouting,
    FormsModule,
    ConfirmModule,
    TagPipeModule,
    CloudinaryModule,
    OpenThreadModule,
    ProfileFormModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordDifficultyModule,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule {
}
