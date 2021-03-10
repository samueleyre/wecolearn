import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material';

import { UserUiModule } from '~/modules/users/modules/user-ui/user-ui.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { AdminRoutingModule } from '~/modules/admin/admin-routing.module';
import { TagUiModule } from '~/modules/tags/modules/tag-ui/tag-ui.module';
import { DomainUiModule } from '~/modules/domains/modules/domain-ui/domain-ui.module';
import { TagDomainUiModule } from '~/modules/tags/modules/tag-domain-ui/tag-domain-ui.module';

import { UsersComponent } from './pages/users/users.component';
import { TagsComponent } from './pages/tags/tags.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { TagDomainsComponent } from './pages/tag-domains/tag-domains.component';
import { TagsDatavizeComponent } from './pages/tags-datavize/tags-datavize.component';
import {SharedModule} from '~/shared/shared.module';

@NgModule({
  declarations: [UsersComponent, TagsComponent, DomainsComponent, TagDomainsComponent, TagsDatavizeComponent],
            imports: [
              AdminRoutingModule,
              CommonModule,
              MaterialModule,
              UserUiModule,
              FormsModule,
              ReactiveFormsModule,
              MatPaginatorModule,
              TagUiModule,
              TagDomainUiModule,
              DomainUiModule,
              MatRadioModule,
              SharedModule,
            ],
})
export class AdminModule { }
