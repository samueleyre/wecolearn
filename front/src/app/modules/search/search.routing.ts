import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from '~/modules/search/pages/search/search.component';


const routes: Routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SearchRouting {
}
