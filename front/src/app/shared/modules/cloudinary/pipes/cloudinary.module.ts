import { NgModule } from '@angular/core';

import { CloudinaryImagePipe } from '~/shared/modules/cloudinary/pipes/image/pipe';


@NgModule({

  declarations: [
    CloudinaryImagePipe,
  ],
  exports: [
    CloudinaryImagePipe,
  ],
  imports: [],
  providers: [],
})
export class CloudinaryModule {
}
