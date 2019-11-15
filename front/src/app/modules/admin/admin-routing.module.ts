import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '~/modules/admin/pages/users/users.component';
import { TagsComponent } from '~/modules/admin/pages/tags/tags.component';

const adminRoutes: Routes = [
  { path: 'users', component: UsersComponent, data: { admin: true } },
  { path: 'tags', component: TagsComponent, data: { admin: true } },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule {
}
