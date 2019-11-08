import { NgModule } from '@angular/core';

import { TagPipe } from '~/shared/modules/tagPipes/pipes/tagPipe/pipe';


@NgModule({

  declarations: [
    TagPipe,
  ],
  exports: [
    TagPipe,
  ],
  imports: [],
  providers: [],
})
export class TagPipeModule {
}
