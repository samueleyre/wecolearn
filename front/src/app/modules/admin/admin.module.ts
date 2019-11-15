import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserUiModule } from '~/modules/users/modules/user-ui/user-ui.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { AdminRoutingModule } from '~/modules/admin/admin-routing.module';

import { UsersComponent } from './pages/users/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { TagsComponent } from './pages/tags/tags.component';
import {TagUiModule} from "~/modules/tags/modules/tag-ui/tag-ui.module";
import { DomainsComponent } from './pages/domains/domains.component';
import {DomainUiModule} from "~/modules/domains/modules/domain-ui/domain-ui.module";

@NgModule({
  declarations: [UsersComponent, TagsComponent, DomainsComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MaterialModule,
    UserUiModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TagUiModule,
    DomainUiModule,
  ],
})
export class AdminModule { }
