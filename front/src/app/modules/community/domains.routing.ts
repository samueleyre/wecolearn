import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JoinLinkComponent } from '~/modules/community/components/join-link/join-link.component';


const routes: Routes = [
  { path: 'invite/:token', component: JoinLinkComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class DomainsRouting { }
