import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileFormModule } from '~/modules/profile/modules/form/form.module';
import { TagsRoutingModule } from '~/modules/tags/tags-routing.module';

import { ProfileTagsSearchBarPageComponent } from '../tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component';
import {TagUiModule} from '~/modules/tags/modules/tag-ui/tag-ui.module';

@NgModule({
  declarations: [
    ProfileTagsSearchBarPageComponent,
  ],
            imports: [
              CommonModule,
              ProfileFormModule,
              TagsRoutingModule,
              TagUiModule,
            ],
})
export class TagsModule { }
