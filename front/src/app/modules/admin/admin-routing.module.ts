import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '~/modules/admin/pages/users/users.component';
import { TagsComponent } from '~/modules/admin/pages/tags/tags.component';
import { DomainsComponent } from '~/modules/admin/pages/domains/domains.component';
import { TagDomainsComponent } from '~/modules/admin/pages/tag-domains/tag-domains.component';

const adminRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'tag-domains', component: TagDomainsComponent },
  { path: 'domains', component: DomainsComponent },
  { path: '', redirectTo: '/dashboard/admin/users', pathMatch: 'full' },

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
