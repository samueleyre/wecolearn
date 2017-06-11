import { NgModule }               from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';


import { PaginationComponent }    from './component';
import { PaginationService }      from './service';
import { Pagination }             from './pagination';


@NgModule({
  imports:[
    BrowserModule  	   
  ],
  exports : [
    PaginationComponent
  ],
  declarations: [ 
  	PaginationComponent,
  ],
  providers: [
    PaginationService,
  ],
  entryComponents: [
    
  ]
})
export class PaginationModule { }
