import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { MdDialogModule }          from '@angular/material';

import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { PopinConfirmComponent }  from './component';
import { PopinConfirmService }    from './service';


@NgModule({
  imports:[   
  	  MdDialogModule,
      BrowserAnimationsModule, 
  ],
  declarations: [ 
  	PopinConfirmComponent,
  ],
  providers: [
    PopinConfirmService
  ],
  entryComponents: [
    PopinConfirmComponent,
  ]
})
export class PopinConfirmModule { }
