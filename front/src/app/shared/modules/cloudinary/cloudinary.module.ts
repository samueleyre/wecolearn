import { NgModule } from '@angular/core';

import { CloudinaryImagePipe } from '~/shared/modules/cloudinary/pipes/image/pipe';
import { UploadFormImageComponent } from '~/shared/modules/cloudinary/components/image/component';
import { SharedModule } from '~/shared/shared.module';
import { UploadModule } from '~/shared/modules/cloudinary/components/upload/module';


@NgModule({

  declarations: [
    UploadFormImageComponent,
    CloudinaryImagePipe,
  ],
  exports: [
    UploadFormImageComponent,
    CloudinaryImagePipe,
  ],
  imports: [
    SharedModule,
    UploadModule,
  ],
  providers: [],
})
export class CloudinaryModule {
}
