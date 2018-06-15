import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http }                     from '@angular/http';

import { TagInputModule } from 'ngx-chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import {MatNativeDateModule}             from '@angular/material';

import { MomentModule }             from 'angular2-moment';

import { ChartsModule }             from 'ng2-charts';
// import { BsDropdownModule }         from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { ApplicativeModule }        from './../applicativeService/module';

// import { PaginationModule }         from './../applicativeService/pagination/module';
import { UploadModule }             from './../applicativeService/upload/module';
import { MessageModule }            from './../applicativeService/message/module';
import { CacheUrlModule }           from './../applicativeService/cache_url/module';


import { QuillModule }              from 'ngx-quill'
import {WcRoutingModule} from './route';

import { GPPDService }              from './service/gppd';
import { GPPDFactory }              from './service/gppd.factory';

import { PeriodService }            from './service/period';
import { SearchService }            from './service/search';
import { TagService }            from './service/tag';

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
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { InfiniteScrollModule }   from 'ngx-infinite-scroll';

import { ClientService } from './service/client';
import { ThreadsService } from './service/threads.service';
import { MessagesService } from './service/messages';
import { LoggedService } from './service/logged';

import { ChatMessageComponent } from './components/client/chat/chat-message/chat-message.component';
import { ChatThreadComponent } from './components/client/chat/chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './components/client/chat/chat-threads/chat-threads.component';
import { ChatWindowComponent } from './components/client/chat/chat-window/chat-window.component';
import { FromNowPipe } from './service/from-now.pipe';

import { SearchBarComponent} from './components/client/searchBar/component';
import { CityBarComponent} from './components/client/cityBar/component';

import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import {PasswordStrengthBarComponent} from "../applicativeService/form/password/component";

@NgModule({
  imports:[
    NgbModule,
    WcRoutingModule,
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
    // BsDropdownModule,
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
    NguiAutoCompleteModule,
    InfiniteScrollModule,

  ],
  exports : [
    UploadModule,
    MessageModule,
    HeaderComponent,
      ReadMoreComponent,
      MentionsComponent,
      CopyComponent,
      GeolocationComponent,
    SearchBarComponent,
    CityBarComponent,
      PasswordStrengthBarComponent
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
    ChatMessageComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    FromNowPipe,
    SearchBarComponent,
    CityBarComponent,
      PasswordStrengthBarComponent

  ],
  providers : [
    {
        provide: GPPDService,
        useFactory: GPPDFactory,
        deps: [Http ]
    },
    ClientService,
    MessagesService,
    PeriodService,
    ThreadsService,
    SearchService,
    TagService,
    LoggedService
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
