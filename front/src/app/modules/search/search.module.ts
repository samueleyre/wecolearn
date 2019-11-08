import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { TagPipeModule } from '~/shared/modules/tagPipes/tagPipe.module';
import { OpenThreadModule } from '~/modules/chat/modules/openThread/openThread.module';
import { SearchBarMobileComponent } from '~/modules/search/components/searchBarMobile/component';
import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';

import { SearchComponent } from './pages/search/component';
import { SearchService } from './services/search';
import { SearchRouting } from './search.routing';
import { CardComponent } from './components/card/component';
import { CityBarComponent } from './components/cityBar/component';
import { SearchBarComponent } from './components/searchBar/component';
import { TextLimitComponent } from './components/limit/component';

@NgModule({

  declarations: [
    SearchComponent,
    CardComponent,
    CityBarComponent,
    SearchBarComponent,
    SearchBarMobileComponent,
    TextLimitComponent,
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InfiniteScrollModule,
    SearchRouting,
    ProfileImageModule,
    NguiAutoCompleteModule,
    TagPipeModule,
    OpenThreadModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CloudinaryModule,
  ],
  providers: [
    SearchService,

  ],
})
export class SearchModule {
}
