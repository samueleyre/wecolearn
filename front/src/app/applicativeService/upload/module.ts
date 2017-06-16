import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { UploadComponent }          from './component';
import { FileUploadModule }         from 'ng2-file-upload';
import { TokenService }             from './../token/service';
import { HeaderBag }                from './../interceptor/header-bag';

@NgModule({
  imports:[
  	  BrowserModule,
      CommonModule,
      FileUploadModule,
  ],
  exports : [
    UploadComponent
  ],
  declarations: [ 
  	UploadComponent,
  ],
  providers : [
    HeaderBag,
    TokenService,  
  ],
  entryComponents: [
     UploadComponent, 
  ]
})
export class UploadModule { }
