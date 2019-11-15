import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainFormComponent } from './components/domain-form/domain-form.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';
import {MaterialModule} from "~/shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [DomainFormComponent, DomainListComponent],
  exports: [
    DomainListComponent,
    DomainFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DomainUiModule { }
