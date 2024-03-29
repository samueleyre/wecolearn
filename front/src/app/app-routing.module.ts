import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';
import { ContainerComponent } from '~/core/layouts/main/component';
import { IonicContainerComponent } from '~/core/layouts/ionic-container/ionic-container.component';
import { MobileGuard } from '~/core/mobile.guard';

import { AuthGuard } from './core/auth.guard';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: '', component: IonicContainerComponent, children: [
    { path: '', redirectTo: '/dashboard/search', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: MainComponent,
      canActivate: [AuthGuard],
      canActivateChild: [MobileGuard],
      children: [
        {
          canLoad: [AuthGuard],
          path: 'profile',
          loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule),
        },
        {
          canLoad: [AuthGuard],
          path: 'search',
          loadChildren: () => import('./modules/search/search.module').then(mod => mod.SearchModule),
        },
        {
          canLoad: [AuthGuard],
          path: 'discussion',
          loadChildren: () => import('./modules/chat/chat.module').then(mod => mod.ChatModule),
        },
        {
          canLoad: [AuthGuard],
          path: 'admin',
          data: { superAdmin: true },
          loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
        },
        {
          canLoad: [AuthGuard],
          path: 'community-admin',
          data: { admin: true },
          loadChildren: () => import('./modules/admin-community/admin-community.module').then(mod => mod.AdminCommunityModule),
        },
        {
          canLoad: [AuthGuard],
          path: 'community',
          loadChildren: () => import('./modules/community/domains.module').then(mod => mod.DomainsModule),
        },
        {
          path: '',
          redirectTo: '/dashboard/search',
          pathMatch: 'full',
        },
      ],
    },
    {
      path: 'tag',
      loadChildren: () => import('./modules/tags/tags.module').then(mod => mod.TagsModule),
    },
    {
      path: '', component: ContainerComponent,
      canActivateChild: [MobileGuard],
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
    { path: 'signin', redirectTo: '/auth/signin', pathMatch: 'full' },
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
