import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http }                     from '@angular/http';

import { TagInputModule } from 'ngx-chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!



import {
    // MaterialModule,
    MatNativeDateModule}             from '@angular/material';

import { MomentModule }             from 'angular2-moment';

import { ChartsModule }             from 'ng2-charts';
import { BsDropdownModule }         from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { ApplicativeModule }        from './../applicativeService/module';

// import { PaginationModule }         from './../applicativeService/pagination/module';
import { UploadModule }             from './../applicativeService/upload/module';
import { MessageModule }            from './../applicativeService/message/module';
import { CacheUrlModule }           from './../applicativeService/cache_url/module';


import { QuillModule }              from 'ngx-quill'
import {PrRoutingModule} from './route';

import { GPPDService }              from './service/gppd';
import { GPPDFactory }              from './service/gppd.factory';

import { PeriodService }            from './service/period';

import { ClientComponent }            from './components/bo/clientsPage/client/component';
import { SearchComponent }            from './components/client/searchPage/search/component';
import { ProfilComponent}            from './components/client/profilPage/profil/component';
import { ProfilSettingsComponent}            from './components/client/profilPage/settings/component';
import { GeolocationComponent}            from './components/client/profilPage/geolocation/component';
import { ReadMoreComponent}            from '././../applicativeService/readMore/component';
import { MentionsComponent }	  from './components/client/mentionslegales/component';
import { CopyComponent }	  from './../applicativeService/copy/component';





import { HeaderComponent }          from './components/header/component';
import { SubscribeComponent }          from './components/client/subscribe/component';
import { UserComponent }	  from './../components/user/component';

import { AgmCoreModule } from '@agm/core';



import { ConfirmModaleComponent }      from './../applicativeService/popin/confirm/component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

import {ScrollToModule} from 'ng2-scroll-to';
import { Ng2ImgMaxModule } from 'ng2-img-max';


@NgModule({
  imports:[
    PrRoutingModule,
    BrowserModule,
    CommonModule,
    // PaginationModule,
    FormsModule,
      ReactiveFormsModule,
    UploadModule,
    // MaterialModule,
    MatNativeDateModule,
    ChartsModule,
    MomentModule,
    RouterModule,
    ApplicativeModule,
    CacheUrlModule,
    BsDropdownModule,
    QuillModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxMyDatePickerModule.forRoot(),
      ScrollToModule,
      Ng2ImgMaxModule,
      AgmCoreModule.forRoot({
          apiKey: "AIzaSyA9v3Cne0PPDnAal2Gt1jAbeGmxSym5Ltg",
          libraries: ["places"]
      }),
      TagInputModule,
      BrowserAnimationsModule,
  ],
  exports : [
    UploadModule,
    MessageModule,
    HeaderComponent,
      ReadMoreComponent,
      MentionsComponent,
      CopyComponent,
      GeolocationComponent,
  ],
  declarations: [
    HeaderComponent,
    SubscribeComponent,
    UserComponent,
  	ClientComponent,
    ProfilComponent,
    ProfilSettingsComponent,
    ConfirmModaleComponent,
    ReadMoreComponent,
    MentionsComponent,
    CopyComponent,
    GeolocationComponent,
    SearchComponent,
  ],
  providers : [
    {
        provide: GPPDService,
        useFactory: GPPDFactory,
        deps: [Http ]
    },
    PeriodService
    // EvolutionService,
    //CacheUrlService,
  ],
  bootstrap:[
    ConfirmModaleComponent,
    GeolocationComponent,

  ],
  entryComponents: [
    
  ]
})
export class WcModule { }

