import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { TokenService } from '~/shared/services/auth/token';
import { HeaderBag } from '~/shared/services/auth/headerBag';

import { UploadComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
  ],
  exports: [
    UploadComponent,
  ],
  declarations: [
    UploadComponent,
  ],
  providers: [
    HeaderBag,
    TokenService,
  ],
  entryComponents: [
    UploadComponent,
  ],
})
export class UploadModule {
}
