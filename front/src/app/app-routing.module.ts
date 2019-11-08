import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/layout/dashboard/component';

import { AuthGuard } from './shared/services/auth/authGuard';
import { CommunitiesComponent } from './pages/communities/component';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: '', redirectTo: '/dashboard/search', pathMatch: 'full' },
  {
    path: 'dashboard/profile', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: './modules/profile/profile.module#ProfileModule',
  },
  {
    path: 'dashboard/discussion', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: './modules/chat/chat.module#ChatModule',
  },
  {
    path: 'doc', loadChildren: './modules/doc/doc.module#DocModule',
  },
  { path: 'communities', component: CommunitiesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: 'dashboard', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(wcRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class WcRoutingModule {
}
