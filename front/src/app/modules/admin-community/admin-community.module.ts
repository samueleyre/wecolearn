import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material';

import { SharedModule } from '~/shared/shared.module';
import { AdminCommunityRoutingModule } from '~/modules/admin-community/admin-community-routing.module';
import { TagsDatavizeComponent } from '~/modules/admin-community/pages/tags-datavize/tags-datavize.component';
import { UserUiModule } from '~/modules/users/modules/user-ui/user-ui.module';
import { ProfileFormModule } from '~/modules/profile/modules/form/form.module';
import { CloudinaryModule } from '~/shared/modules/cloudinary/cloudinary.module';

import { AdminCommunityUsersComponent } from './pages/admin-community-users/admin-community-users.component';
import { AdminCommunitySettingsComponent } from './pages/admin-community-settings/admin-community-settings.component';
import { AdminCommunityMessageStatsComponent } from './pages/admin-community-message-stats/admin-community-message-stats.component';


@NgModule({
  declarations: [
    TagsDatavizeComponent,
    AdminCommunityUsersComponent,
    AdminCommunitySettingsComponent,
    AdminCommunityMessageStatsComponent,
  ],
  imports: [
    SharedModule,
    AdminCommunityRoutingModule,
    UserUiModule,
    MatPaginatorModule,
    ProfileFormModule,
    CloudinaryModule,
  ],
})
export class AdminCommunityModule { }
