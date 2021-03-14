import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material';

import { SharedModule } from '~/shared/shared.module';
import { AdminCommunityRoutingModule } from '~/modules/admin-community/admin-community-routing.module';
import { TagsDatavizeComponent } from '~/modules/admin-community/pages/tags-datavize/tags-datavize.component';
import { UserUiModule } from '~/modules/users/modules/user-ui/user-ui.module';

import { AdminCommunityUsersComponent } from './pages/admin-community-users/admin-community-users.component';


@NgModule({
  declarations: [
    TagsDatavizeComponent,
    AdminCommunityUsersComponent,
  ],
  imports: [
    SharedModule,
    AdminCommunityRoutingModule,
    UserUiModule,
    MatPaginatorModule,
  ],
})
export class AdminCommunityModule { }
