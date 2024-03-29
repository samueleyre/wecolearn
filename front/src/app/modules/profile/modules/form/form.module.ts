import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSliderModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { IonicModule } from '@ionic/angular';

import { CloudinaryModule } from '~/shared/modules/cloudinary/cloudinary.module';
import { ProfileFormBiographyComponent } from '~/modules/profile/modules/form/components/biography/component';
import { ProfileFormIntensityComponent } from '~/modules/profile/modules/form/components/intensity/component';
import { ProfileFormGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/component';
import { ProfileGeolocationComponent } from '~/modules/profile/modules/form/components/geolocation/geolocation/component';
import { UploadModule } from '~/shared/modules/cloudinary/components/upload/module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { SharedModule } from '~/shared/shared.module';

import { ProfileFormTagsComponent } from './components/profile-form-tags/component';
import { ProfileImageModule } from '../profilImage/profileImage.module';
import { ProfileFormLastnameComponent } from './components/lastname/component';
import { ProfileFormFirstnameComponent } from './components/firstname/component';
import { ProfileFormCityComponent } from './components/profile-form-city/profile-form-city.component';
import { ProfileFormTagsMobileComponent } from './components/profile-form-tags-mobile/profile-form-tags-mobile.component';


@NgModule({

  declarations: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormBiographyComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,
    ProfileFormTagsComponent,
    ProfileFormTagsMobileComponent,
  ],
  exports: [
    ProfileFormFirstnameComponent,
    ProfileFormLastnameComponent,
    ProfileFormBiographyComponent,
    ProfileFormIntensityComponent,
    ProfileFormGeolocationComponent,
    ProfileGeolocationComponent,
    ProfileFormCityComponent,
    ProfileFormTagsComponent,
    ProfileFormTagsMobileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileImageModule,
    CloudinaryModule,
    MatSliderModule,
    MaterialModule,
    MatAutocompleteModule,
    MatRadioModule,
    IonicModule,
  ],
})
export class ProfileFormModule {
}
