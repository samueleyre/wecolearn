import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ConfirmModaleComponent } from './components/confirm/component';


@NgModule({

  declarations: [
    ConfirmModaleComponent,
  ],
  exports: [
    ConfirmModaleComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
  ],
})
export class ConfirmModule {
}
