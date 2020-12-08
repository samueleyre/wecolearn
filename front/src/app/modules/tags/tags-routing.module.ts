import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileTagsSearchBarPageComponent } from '~/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component';


const routes: Routes = [
  {
    path: 'searchBar', component: ProfileTagsSearchBarPageComponent, pathMatch: 'full',
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
export class TagsRoutingModule {
}
