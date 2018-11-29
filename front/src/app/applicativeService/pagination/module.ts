import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { FormsModule }                from '@angular/forms';


import { PaginationComponent }        from './component';
import { PaginationService }          from './service';
import { Pagination }                 from './pagination';
import { SelectPaginationComponent }  from './select';


@NgModule({
  imports:[
    BrowserModule,
    FormsModule
  ],
  exports : [
    PaginationComponent,
    SelectPaginationComponent,
  ],
  declarations: [ 
  	PaginationComponent,
    SelectPaginationComponent,
  ],
  providers: [
    PaginationService,

  ],
  entryComponents: [
    
  ]
})
export class PaginationModule { }
