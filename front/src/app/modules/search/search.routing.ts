import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';
import { AuthGuard } from '~/core/services/auth/authGuard';

import { SearchComponent } from './pages/search/component';


const routes: Routes = [

  {path: 'dashboard/search', component: MainComponent, canActivate: [AuthGuard],
    children : [
            { path: '', component: SearchComponent },
    ],
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SearchRouting {
}
