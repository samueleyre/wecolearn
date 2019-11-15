import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';

import { AuthGuard } from './core/services/auth/authGuard';
import { CommunitiesComponent } from './pages/communities/component';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: '', redirectTo: '/dashboard/search', pathMatch: 'full' },
  {
    path: 'dashboard/profile', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule),
  },
  {
    path: 'dashboard/discussion', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: () => import('./modules/chat/chat.module').then(mod => mod.ChatModule),
  },
  {
    path: 'dashboard/admin', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
  },
  {
    path: 'doc', loadChildren: () => import('./modules/doc/doc.module').then(mod => mod.DocModule),
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
