import { NgModule }               from '@angular/core';

import { PaginationComponent }    from './component';
import { PaginationService }      from './service';
import { Pagination }             from './pagination';


@NgModule({
  imports:[
  	   
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
