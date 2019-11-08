import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import {UserUiModule} from "~/modules/users/modules/user-ui/user-ui.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UserUiModule,
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
