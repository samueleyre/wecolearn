import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSettingsDesktopComponent } from '~/modules/profile/pages/profileSettings/profile-settings-desktop/profile-settings-desktop.component';
import { ProfileSettingsMobileComponent } from '~/modules/profile/pages/profileSettings/profile-settings-mobile/profile-settings-mobile.component';
import { SettingsDesktopComponent } from '~/modules/profile/pages/settings/settings-desktop/settings-desktop.component';
import { SettingsMobileComponent } from '~/modules/profile/pages/settings/settings-mobile/settings-mobile.component';
import { ProfileDesktopComponent } from '~/modules/profile/pages/profile/profile-desktop/profile-desktop.component';
import { ProfileMobileComponent } from '~/modules/profile/pages/profile/profile-mobile/profile-mobile.component';

const motherRoute = 'dashboard/profile';
const routes: Routes = [

  { path: 'home', data: { surface: ['desktop'], redirectTo: motherRoute + '/home/mobile' }, component: ProfileSettingsDesktopComponent, pathMatch: 'full' },
  { path: 'home/mobile', data: { surface: ['mobile'], redirectTo: motherRoute + '/home' }, component: ProfileSettingsMobileComponent, pathMatch: 'full' },

  { path: 'settings', data: { surface: ['desktop'], redirectTo: motherRoute + '/settings/mobile' }, component: SettingsDesktopComponent, pathMatch: 'full' },
  { path: 'settings/mobile', data: { surface: ['mobile'], redirectTo: motherRoute + '/settings' }, component: SettingsMobileComponent, pathMatch: 'full' },

  { path: 'public/:profileUrl', data: { desktopOnly: true }, component: ProfileDesktopComponent },
  { path: 'public/:profileUrl/mobile', component: ProfileMobileComponent },

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
