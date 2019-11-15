import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserUiModule } from '~/modules/users/modules/user-ui/user-ui.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { AdminRoutingModule } from '~/modules/admin/admin-routing.module';

import { UsersComponent } from './pages/users/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MaterialModule,
    UserUiModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
})
export class AdminModule { }
