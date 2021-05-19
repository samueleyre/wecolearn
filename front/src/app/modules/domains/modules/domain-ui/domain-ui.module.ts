import { NgModule } from '@angular/core';

import { SharedModule } from '~/shared/shared.module';

import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';

@NgModule({
  declarations: [DomainFormComponent, DomainListComponent],
  exports: [
    DomainListComponent,
    DomainFormComponent,
  ],
  imports: [
    SharedModule,
  ],
})
export class DomainUiModule { }
