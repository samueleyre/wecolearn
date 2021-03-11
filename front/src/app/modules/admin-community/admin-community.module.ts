import { NgModule } from '@angular/core';

import { SharedModule } from '~/shared/shared.module';
import { AdminCommunityRoutingModule } from '~/modules/admin-community/admin-community-routing.module';
import { TagsDatavizeComponent } from '~/modules/admin-community/pages/tags-datavize/tags-datavize.component';


@NgModule({
  declarations: [
    TagsDatavizeComponent,
  ],
  imports: [
    SharedModule,
    AdminCommunityRoutingModule,
  ],
})
export class AdminCommunityModule { }
