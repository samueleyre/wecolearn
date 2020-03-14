import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/shared/modules/material/material.module';

import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import {TagDomainUiModule} from "~/modules/tags/modules/tag-domain-ui/tag-domain-ui.module";

@NgModule({
  declarations: [TagFormComponent, TagListComponent],
  exports: [
    TagListComponent,
    TagFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TagDomainUiModule,
  ],
})
export class TagUiModule { }
