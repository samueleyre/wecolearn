import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import { FormsModule }              from '@angular/forms';
import { Http }                     from '@angular/http';

import { PopinConfirmModule }       from './../applicativeService/popin/confirm/module';
import { PaginationModule }         from './../applicativeService/pagination/module';
import { UploadModule }             from './../applicativeService/upload/module';

import { route }                    from './route';

import { GPPDService }              from './service/gppd';
import { GPPDFactory }              from './service/gppd.factory';

import { BlogComponent }            from './components/blog/component';
import { ClientComponent }          from './components/client/component';
import { AncreComponent }           from './components/ancre/component';
import { ClefComponent }            from './components/clef/component';
import { TitreComponent }           from './components/titre/component';
import { NeutreComponent }          from './components/neutre/component';
import { NeutreGeneratorComponent } from './components/neutre-generator/component';
import { BgUploadComponent }        from './components/upload/component';
import { MasseComponent }        from './components/masse/component';

import { SelectLanguageComponent }  from './components/select/language/component';
import { SelectClientComponent }    from './components/select/client/component';
import { SelectBlogsComponent }    from './components/select/blogs/component';
import { LanguageComponent }        from './component/language';

@NgModule({
  imports:[
  	  route,
      BrowserModule,
      CommonModule,
      PaginationModule,
      PopinConfirmModule,
      FormsModule,
      UploadModule, 
  ],
  exports : [
    RouterModule,
    UploadModule,
  ],
  declarations: [ 
  	BlogComponent,
    ClientComponent,
    AncreComponent,
    ClefComponent,
    TitreComponent,
    NeutreComponent,
    NeutreGeneratorComponent,
    MasseComponent,
    BgUploadComponent,
    SelectLanguageComponent,
    LanguageComponent,
    SelectClientComponent,
    SelectBlogsComponent,


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
