import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '~/shared/shared.module';
import { DomainsRouting } from '~/modules/community/domains.routing';

import { JoinLinkComponent } from './components/join-link/join-link.component';

@NgModule({
  declarations: [JoinLinkComponent],
  imports: [
    CommonModule,
    SharedModule,
    DomainsRouting,
  ],
})
export class DomainsModule { }
