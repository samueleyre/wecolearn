import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import {MaterialModule} from "~/shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [TagFormComponent, TagListComponent],
  exports: [
    TagListComponent,
    TagFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TagUiModule { }
