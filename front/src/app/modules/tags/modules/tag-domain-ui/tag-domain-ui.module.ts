import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/shared/modules/material/material.module';

import { TagDomainAutocompleteComponent } from './components/tag-domain-autocomplete/tag-domain-autocomplete.component';
import { TagDomainFormComponent } from './components/tag-domain-form/tag-domain-form.component';
import { TagDomainListComponent } from './components/tag-domain-list/tag-domain-list.component';

@NgModule({
  declarations: [
    TagDomainAutocompleteComponent,
    TagDomainFormComponent,
    TagDomainFormComponent,
    TagDomainListComponent,
    TagDomainListComponent,
  ],
  exports: [
    TagDomainAutocompleteComponent,
    TagDomainFormComponent,
    TagDomainListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TagDomainUiModule { }
