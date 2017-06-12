import { BrowserModule }           from '@angular/platform-browser';
import { NgModule  }               from '@angular/core';
import { RouterModule }            from '@angular/router';
import { FormsModule }             from '@angular/forms';

import { PopinConfirmModule }        from './../applicativeService/popin/confirm/module';
import { PaginationModule }        from './../applicativeService/pagination/module';

import { route }                  from './route';
import { GPPDService }            from './service/gppd';

import { BlogComponent }          from './components/blog/component';
import { ClientComponent }          from './components/client/component';


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
    ClientComponent,
  ],
  providers : [
    GPPDService
  ],
  entryComponents: [
    
  ]
})
export class BgModule { }
