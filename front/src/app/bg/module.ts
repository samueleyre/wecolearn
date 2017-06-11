import { BrowserModule }           from '@angular/platform-browser';
import { NgModule  }               from '@angular/core';
import { RouterModule }            from '@angular/router';
import { FormsModule }             from '@angular/forms';

import { route }                  from './route';
import { BlogComponent }          from './components/blog/component';
import { BlogService }            from './components/blog/service';

import { PopinConfirmModule }        from './../applicativeService/popin/confirm/module';

import { PaginationModule }        from './../applicativeService/pagination/module';



@NgModule({
  imports:[
  	  route,
      BrowserModule,
      PaginationModule,
      PopinConfirmModule,
      FormsModule,
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
