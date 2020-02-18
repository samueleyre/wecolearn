import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestureConfig, MatFormFieldModule, MatInputModule, MatSliderModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';
import { ProfileFormBiographyComponent } from '~/modules/profile/modules/form/components/biography/component';
import { ProfileFormKnowTagsComponent } from '~/modules/profile/modules/form/components/knowTags/component';
import { ProfileFormTeachTagsComponent } from '~/modules/profile/modules/form/components/teachTags/component';
import { ProfileFormIntensityComponent } from '~/modules/profile/modules/form/components/intensity/component';
import { ProfileFormGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/component';
import { ProfileGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/geolocation/component';
import { environment } from '~/../environments/environment';
import { UploadModule } from '~/modules/profile/modules/form/modules/upload/module';

import { ProfileFormLearnTagsComponent } from './components/learnTags/component';
import { ProfileTagInputComponent } from './components/tagInput/component';
import { ProfileFormImageComponent } from './components/image/component';
import { ProfileImageModule } from '../profilImage/profileImage.module';
import { ProfileFormLastnameComponent } from './components/lastname/component';
import { ProfileFormFirstnameComponent } from './components/firstname/component';
import {MaterialModule} from "~/shared/modules/material/material.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ProfileFormCityComponent } from './components/profile-form-city/profile-form-city.component';
import {MatRadioModule} from "@angular/material/radio";


@NgModule({

  declarations: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormImageComponent,
    ProfileFormLearnTagsComponent,
    ProfileTagInputComponent,
    ProfileFormBiographyComponent,
    ProfileFormKnowTagsComponent,
    ProfileFormTeachTagsComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,

  ],
  exports: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormImageComponent,
    ProfileFormLearnTagsComponent,
    ProfileFormBiographyComponent,
    ProfileFormKnowTagsComponent,
    ProfileFormTeachTagsComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule,
    ProfileImageModule,
    CloudinaryModule,
    TagInputModule,
    MatSliderModule,
    MaterialModule,
    MatAutocompleteModule,
    MatRadioModule,
  ],
})
export class ProfileFormModule {
}
