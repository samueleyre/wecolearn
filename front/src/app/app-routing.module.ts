import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';
import { ContainerComponent } from '~/core/layouts/main/component';
import { LandingPageComponent } from '~/modules/auth/pages/landing/component';

import { AuthGuard } from './core/services/auth/authGuard';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: 'signin', component: LandingPageComponent, pathMatch: 'full' },
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
    path: 'dashboard/search', component: MainComponent, canActivate: [AuthGuard],
    loadChildren: () => import('./modules/search/search.module').then(mod => mod.SearchModule),
  },
  {
    path: 'doc', component: ContainerComponent,
    loadChildren: () => import('./modules/doc/doc.module').then(mod => mod.DocModule),
  },
  {
    path: 'auth', component: ContainerComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
  },
  { path: '404', pathMatch: 'full', component: ContainerComponent, children: [{ path: '', component: NotFoundComponent }] },
  { path: '**', redirectTo: '404' },
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


// { path: 'communities', component: CommunitiesComponent },
