import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MaterialModule } from '~/shared/modules/material/material.module';
import { TagDomainUiModule } from '~/modules/tags/modules/tag-domain-ui/tag-domain-ui.module';
import { SharedModule } from '~/shared/shared.module';
import { TagSearchMobileComponent } from '~/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component';

import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagMergeFormComponent } from './components/tag-merge-form/tag-merge-form.component';
import { TagAutocompleteComponent } from './components/tag-autocomplete/tag-autocomplete.component';

@NgModule({
  declarations: [
    TagFormComponent,
    TagListComponent,
    TagMergeFormComponent,
    TagAutocompleteComponent,
    TagSearchMobileComponent,
  ],
  exports: [
    TagListComponent,
    TagFormComponent,
    TagMergeFormComponent,
    TagSearchMobileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TagDomainUiModule,
    SharedModule,
    IonicModule,
  ],
})
export class TagUiModule { }
