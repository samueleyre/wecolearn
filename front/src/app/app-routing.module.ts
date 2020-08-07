import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';
import { ContainerComponent } from '~/core/layouts/main/component';
import { LandingPageComponent } from '~/modules/auth/pages/landing/component';
import { IonicContainerComponent } from '~/core/layouts/ionic-container/ionic-container.component';

import { AuthGuard } from './core/services/auth/authGuard';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: '', component: IonicContainerComponent, children: [
      { path: 'signin', component: LandingPageComponent, pathMatch: 'full' },
      { path: '', redirectTo: '/dashboard/search', pathMatch: 'full' },
    {
      path: 'dashboard', component: MainComponent, canActivate: [AuthGuard],
      children: [
        {
          path: 'profile',
          loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule),
        },
        {
          path: 'search',
          loadChildren: () => import('./modules/search/search.module').then(mod => mod.SearchModule),
        },
        {
          path: 'discussion',
          loadChildren: () => import('./modules/chat/chat.module').then(mod => mod.ChatModule),
        },
        {
          path: 'admin',
          loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
        },

      ],
    },
    {
      path: '', component: ContainerComponent,
      children: [
        {
          path: 'doc',
          loadChildren: () => import('./modules/doc/doc.module').then(mod => mod.DocModule),
        },
        {
          path: 'auth',
          loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
        },
        {
          path: '404',
          pathMatch: 'full',
          component: NotFoundComponent,
        },
      ],
    },
      { path: '**', redirectTo: '404' },
  ],
  },

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
