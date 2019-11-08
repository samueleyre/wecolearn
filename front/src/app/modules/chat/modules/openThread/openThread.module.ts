import { NgModule } from '@angular/core';

import { OpenThreadComponent } from '~/modules/chat/modules/openThread/components/component';


@NgModule({

  declarations: [
    OpenThreadComponent,
  ],
  exports: [
    OpenThreadComponent,
  ],
  imports: [],
  providers: [],
})
export class OpenThreadModule {
}
