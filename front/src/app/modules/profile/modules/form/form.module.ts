import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSliderModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

import { CloudinaryModule } from '~/shared/modules/cloudinary/pipes/cloudinary.module';
import { ProfileFormBiographyComponent } from '~/modules/profile/modules/form/components/biography/component';
import { ProfileFormIntensityComponent } from '~/modules/profile/modules/form/components/intensity/component';
import { ProfileFormGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/component';
import { ProfileGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/geolocation/component';
import { UploadModule } from '~/modules/profile/modules/form/modules/upload/module';
import { MaterialModule } from '~/shared/modules/material/material.module';

import { ProfileFormTagsComponent } from './components/profile-form-tags/component';
import { ProfileFormImageComponent } from './components/image/component';
import { ProfileImageModule } from '../profilImage/profileImage.module';
import { ProfileFormLastnameComponent } from './components/lastname/component';
import { ProfileFormFirstnameComponent } from './components/firstname/component';
import { ProfileFormCityComponent } from './components/profile-form-city/profile-form-city.component';
import {SharedModule} from "~/shared/shared.module";


@NgModule({

  declarations: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormImageComponent,
    ProfileFormBiographyComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,
    ProfileFormTagsComponent,
  ],
  exports: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormImageComponent,
    ProfileFormBiographyComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,
    ProfileFormTagsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule,
    ProfileImageModule,
    CloudinaryModule,
    MatSliderModule,
    MaterialModule,
    MatAutocompleteModule,
    MatRadioModule,
  ],
})
export class ProfileFormModule {
}
