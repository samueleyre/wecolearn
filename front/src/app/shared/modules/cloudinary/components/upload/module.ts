import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { SessionService } from '~/core/services/auth/session.service';
import { HeaderBag } from '~/core/services/auth/headerBag';

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
    SessionService,
  ],
  entryComponents: [
    UploadComponent,
  ],
})
export class UploadModule {
}
