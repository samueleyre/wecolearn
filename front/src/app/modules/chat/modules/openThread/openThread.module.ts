import { NgModule } from '@angular/core';

import { OpenThreadComponent } from '~/modules/chat/modules/openThread/components/component';
import { MaterialModule } from '~/shared/modules/material/material.module';


@NgModule({

  declarations: [
    OpenThreadComponent,
  ],
  exports: [
    OpenThreadComponent,
  ],
  imports: [
    MaterialModule,
  ],
  providers: [],
})
export class OpenThreadModule {
}
