import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/shared/modules/material/material.module';

import { TagDomainAutocompleteComponent } from './components/tag-domain-autocomplete/tag-domain-autocomplete.component';

@NgModule({
  declarations: [TagDomainAutocompleteComponent],
  exports: [
    TagDomainAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TagDomainUiModule { }
