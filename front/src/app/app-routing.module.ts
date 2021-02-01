import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '~/core/layouts/dashboard/component';
import { ContainerComponent } from '~/core/layouts/main/component';
import { LandingPageComponent } from '~/modules/auth/pages/landing/component';
import { IonicContainerComponent } from '~/core/layouts/ionic-container/ionic-container.component';
import { MobileGuard } from '~/core/mobile.guard';

import { AuthGuard } from './core/auth.guard';
import { NotFoundComponent } from './pages/notFound/component';


const wcRoutes: Routes = [
  { path: '', component: IonicContainerComponent, children: [
    { path: 'signin', component: LandingPageComponent, pathMatch: 'full' },
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
          data: { admin: true },
          loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
        },
      ],
    },
    {
      path: 'tag',
          // todo: only mobile
      loadChildren: () => import('./modules/tags/tags.module').then(mod => mod.TagsModule),
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
