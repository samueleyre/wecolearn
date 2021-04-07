import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagsDatavizeComponent } from '~/modules/admin-community/pages/tags-datavize/tags-datavize.component';
import { AdminCommunityUsersComponent } from '~/modules/admin-community/pages/admin-community-users/admin-community-users.component';
import { AdminCommunitySettingsComponent } from '~/modules/admin-community/pages/admin-community-settings/admin-community-settings.component';
import { AdminCommunityMessageStatsComponent } from '~/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component';


const adminRoutes: Routes = [
  { path: 'users', component: AdminCommunityUsersComponent },
  { path: 'tags', component: TagsDatavizeComponent },
  { path: 'stats', component: AdminCommunityMessageStatsComponent },
  { path: 'settings', component: AdminCommunitySettingsComponent },
  { path: '', redirectTo: '/dashboard/community-admin/tags', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminCommunityRoutingModule {
}
