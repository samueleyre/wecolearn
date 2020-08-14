import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/shared/modules/material/material.module';
import { TagDomainUiModule } from '~/modules/tags/modules/tag-domain-ui/tag-domain-ui.module';

import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagMergeFormComponent } from './components/tag-merge-form/tag-merge-form.component';
import { TagAutocompleteComponent } from './components/tag-autocomplete/tag-autocomplete.component';

@NgModule({
  declarations: [TagFormComponent, TagListComponent, TagMergeFormComponent, TagAutocompleteComponent],
  exports: [
    TagListComponent,
    TagFormComponent,
    TagMergeFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TagDomainUiModule,
  ],
})
export class TagUiModule { }
