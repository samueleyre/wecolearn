import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSettingsPageComponent } from './pages/profileSettings/component';
import { ProfilePageComponent } from './pages/profile/component';
import { SettingsPageComponent } from './pages/settings/component';


const routes: Routes = [

  {
    path: '', component: ProfileSettingsPageComponent, pathMatch: 'full',
  },
  {
    path: 'settings', component: SettingsPageComponent, pathMatch: 'full',
  },
  {
    path: ':profileUrl', component: ProfilePageComponent,
  },

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
