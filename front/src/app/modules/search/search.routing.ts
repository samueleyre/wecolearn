import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchMobileComponent } from '~/modules/search/pages/search/search-mobile/search-mobile.component';
import { SearchDesktopComponent } from '~/modules/search/pages/search/search-desktop/search-desktop.component';

const motherRoute = 'dashboard/search';
const routes: Routes = [
  { path: '', data: { surface: ['desktop'], redirectTo: motherRoute + '/mobile' }, component: SearchDesktopComponent, pathMatch: 'full' },
  { path: 'mobile', data: { surface: ['mobile'], redirectTo: motherRoute }, component: SearchMobileComponent, pathMatch: 'full' },
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
