import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import { FormsModule }              from '@angular/forms';
import { Http }                     from '@angular/http';

import {
    MaterialModule, 
    MdNativeDateModule}             from '@angular/material';

import { MomentModule }             from 'angular2-moment';

import { ChartsModule }             from 'ng2-charts';

import { ApplicativeModule }        from './../applicativeService/module';

import { PopinConfirmModule }       from './../applicativeService/popin/confirm/module';
import { PaginationModule }         from './../applicativeService/pagination/module';
import { UploadModule }             from './../applicativeService/upload/module';
import { MessageModule }            from './../applicativeService/message/module';
import { CacheUrlModule }           from './../applicativeService/cache_url/module';


import { BgRoutingModule }          from './route';

import { GPPDService }              from './service/gppd';
import { GPPDFactory }              from './service/gppd.factory';
import { EvolutionService }         from './components/evolution/service';

import { BlogComponent }            from './components/blog/component';
import { ClientComponent }          from './components/client/component';
import { AncreComponent }           from './components/ancre/component';
import { ClefComponent }            from './components/clef/component';
import { TitreComponent }           from './components/titre/component';
import { NeutreComponent }          from './components/neutre/component';
import { NeutreGeneratorComponent } from './components/neutre-generator/component';
import { BgUploadComponent }        from './components/upload/component';
import { MasseComponent }           from './components/masse/component';
import { LaunchComponent }          from './components/launch/component';
import { ProgrammationComponent }   from './components/programmation/component';
import { RechercheComponent }       from './components/recherche/component';
import { VisualizationComponent }   from './components/visualization/component';
import { HebergeurComponent }       from './components/hebergeur/component';

import { SelectLanguageComponent }  from './components/select/language/component';
import { SelectClientComponent }    from './components/select/client/component';
import { SelectBlogsComponent }    from './components/select/blogs/component';
import { LanguageComponent }        from './component/language';
import { EvolutionComponent }       from './components/evolution/component';
import { DisplayBlogComponent }      from './components/display/blog/component';
import { DisplayClientComponent }    from './components/display/client/component';
import { DisplayClefComponent }       from './components/display/clef/component';
import { ExceptionComponent }         from './components/exception/component';


@NgModule({
  imports:[
  	  BgRoutingModule,
      BrowserModule,
      CommonModule,
      PaginationModule,
      PopinConfirmModule,
      FormsModule,
      UploadModule,
      MaterialModule, 
      MdNativeDateModule,
      ChartsModule,
      MomentModule,
      RouterModule,
      ApplicativeModule,
      CacheUrlModule,
  ],
  exports : [
    UploadModule,
    MessageModule,
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
    EvolutionComponent,
    LaunchComponent,
    ProgrammationComponent,
    RechercheComponent,
    VisualizationComponent,
    HebergeurComponent,

    SelectLanguageComponent,
    LanguageComponent,
    SelectClientComponent,
    SelectBlogsComponent,
    DisplayBlogComponent,
    DisplayClientComponent,
    DisplayClefComponent,
    ExceptionComponent,
  ],
  providers : [
    {
            provide: GPPDService,
            useFactory: GPPDFactory,
            deps: [Http ]
    },
    EvolutionService,
    //CacheUrlService,
  ],
  entryComponents: [
    
  ]
})
export class BgModule { }
