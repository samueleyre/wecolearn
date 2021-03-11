import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagsDatavizeComponent } from '~/modules/admin-community/pages/tags-datavize/tags-datavize.component';


const adminRoutes: Routes = [
  { path: 'tags', component: TagsDatavizeComponent },
  { path: '', redirectTo: '/dashboard/community/tags', pathMatch: 'full' },

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
