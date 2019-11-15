import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmDialogComponent } from '~/core/components/dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [ConfirmDialogComponent],

})
export class CoreModule {}
