import { NgModule } from '@angular/core';

import { SafeUrlPipe } from './pipes/safeUrl/pipe';


@NgModule({

  declarations: [
    SafeUrlPipe,
  ],
  exports: [
    SafeUrlPipe,
  ],
  imports: [
  ],
  providers: [
  ],
})
export class SafeUrlPipeModule {
}
