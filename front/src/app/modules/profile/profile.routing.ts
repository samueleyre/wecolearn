import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSettingsDesktopComponent } from '~/modules/profile/pages/profileSettings/profile-settings-desktop/profile-settings-desktop.component';
import { ProfileSettingsMobileComponent } from '~/modules/profile/pages/profileSettings/profile-settings-mobile/profile-settings-mobile.component';
import { SettingsDesktopComponent } from '~/modules/profile/pages/settings/settings-desktop/settings-desktop.component';
import { SettingsMobileComponent } from '~/modules/profile/pages/settings/settings-mobile/settings-mobile.component';
import { ProfileDesktopComponent } from '~/modules/profile/pages/profile/profile-desktop/profile-desktop.component';
import { ProfileMobileComponent } from '~/modules/profile/pages/profile/profile-mobile/profile-mobile.component';

  const routes: Routes = [

  { path: 'home', data: { surface: ['desktop'] }, component: ProfileSettingsDesktopComponent, pathMatch: 'full' },
  { path: 'home/mobile', data: { surface: ['mobile', 'android'] }, component: ProfileSettingsMobileComponent, pathMatch: 'full' },

  { path: 'settings', data: { surface: ['desktop'] }, component: SettingsDesktopComponent, pathMatch: 'full' },
  { path: 'settings/mobile', data: { surface: ['mobile', 'android'] }, component: SettingsMobileComponent, pathMatch: 'full' },

  { path: 'public/:profileUrl', data: { surface: ['desktop'] }, component: ProfileDesktopComponent },
  { path: 'public/:profileUrl/mobile', data: { surface: ['mobile, android'] }, component: ProfileMobileComponent },

  { path: '', redirectTo: 'home' },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProfileRouting {
}
