import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import { FormsModule }              from '@angular/forms';
import { Http }                     from '@angular/http';

import { PopinConfirmModule }       from './../applicativeService/popin/confirm/module';
import { PaginationModule }         from './../applicativeService/pagination/module';

import { route }                    from './route';

import { GPPDService }              from './service/gppd';
import { GPPDFactory }              from './service/gppd.factory';

import { BlogComponent }            from './components/blog/component';
import { ClientComponent }          from './components/client/component';
import { AncreComponent }           from './components/ancre/component';
import { ClefComponent }            from './components/clef/component';

import { SelectLanguageComponent }  from './components/select/language/component';
import { SelectClientComponent }    from './components/select/client/component';
  

@NgModule({
  imports:[
  	  route,
      BrowserModule,
      CommonModule,
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
    AncreComponent,
    ClefComponent,
    SelectLanguageComponent,
    SelectClientComponent,

  ],
  providers : [
    {
            provide: GPPDService,
            useFactory: GPPDFactory,
            deps: [Http ]
    },
  ],
  entryComponents: [
    
  ]
})
export class BgModule { }
