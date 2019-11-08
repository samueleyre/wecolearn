import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainFooterComponent } from '~/shared/modules/footer/components/footer/component';

@NgModule({

  declarations: [
    MainFooterComponent,
  ],
  exports: [
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
})
export class FooterModule {
}
