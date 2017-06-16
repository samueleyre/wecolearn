import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { UploadComponent }          from './component';
import { FileUploadModule }         from 'ng2-file-upload';

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
  
  ],
  entryComponents: [
     UploadComponent, 
  ]
})
export class UploadModule { }
