import { BrowserModule }           from '@angular/platform-browser';
import { NgModule  }              from '@angular/core';
import { RouterModule }    from '@angular/router';
import { route }                  from './route';
import { BlogComponent }          from './components/blog/component';
import { BlogService }            from './components/blog/service';

import { PaginationModule }        from './../applicativeService/pagination/module'; 


@NgModule({
  imports:[
  	  route,
      BrowserModule,
      PaginationModule,
  ],
  exports : [
    RouterModule
  ],
  declarations: [ 
  	BlogComponent,
  ],
  providers : [
    BlogService,
  ],
  entryComponents: [
    
  ]
})
export class BgModule { }
