import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { OpenThreadModule } from '~/modules/chat/modules/openThread/openThread.module';
import { SearchBarMobileComponent } from '~/modules/search/components/searchBar/searchBarMobile/component';
import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';
import { SearchBarComponent } from '~/modules/search/components/searchBar/searchBarDesktop/component';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';
import { SearchComponent } from '~/modules/search/pages/search/search.component';
import { SearchComponentBase } from '~/modules/search/pages/search/search.component.base';

import { SearchRouting } from './search.routing';
import { CardComponent } from './components/card/component';
import { CityBarComponent } from './components/cityBar/component';
import { TextLimitComponent } from './components/limit/component';
import { SearchMobileComponent } from './pages/search/search-mobile/search-mobile.component';
import { SearchDesktopComponent } from './pages/search/search-desktop/search-desktop.component';
import {MaterialModule} from "~/shared/modules/material/material.module";
import {SharedModule} from "~/shared/shared.module";

@NgModule({

  declarations: [
    SearchComponent,
    SearchComponentBase,
    CardComponent,
    CityBarComponent,
    SearchBarComponent,
    SearchBarBaseComponent,
    SearchBarMobileComponent,
    TextLimitComponent,
    SearchMobileComponent,
    SearchDesktopComponent,
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    SearchRouting,
    ProfileImageModule,
    NguiAutoCompleteModule,
    PipesModule,
    OpenThreadModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CloudinaryModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
  ],
})
export class SearchModule {
}
