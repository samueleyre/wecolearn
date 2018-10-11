import { BrowserModule }            from '@angular/platform-browser';
import { CommonModule }             from '@angular/common';
import { NgModule  }                from '@angular/core';
import { RouterModule }             from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";

// import { HTTP_INTERCEPTORS } from '@angular/common/http';


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
import { ProfilSettingsComponent}            from './components/client/profilPage/profilSettings/component';
import { SettingsComponent}            from './components/client/settings/component';
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

import {NgxPageScrollModule} from 'ngx-page-scroll';
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
import { SearchOsmComponent} from './components/client/profilPage/searchOsm/component';
import { EmailNotificationSettingsComponent} from './components/client/settings/notifications/component';
import { CityBarComponent} from './components/client/cityBar/component';

import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import {PasswordStrengthBarComponent} from "../applicativeService/form/password/component";
import {HomePageComponent} from "./components/client/home/page/component";
// import {InterceptorHttpClient} from "../applicativeService/interceptor/interceptorHttpClient";
// import {httpClientFactory} from "../applicativeService/interceptor/httpClientFactory";
import { AboutComponent } 			from './components/client/about/component';
import { CommunitiesComponent} 			from './components/client/communities/component';
import { CommunityComponent} 			from './components/client/communities/community/component';

import {SendPasswordConfirmationEmailComponent} from "./../components/resetPassword/sendConfirmationEmail/component";
import {ResetPasswordFormComponent} from "./../components/resetPassword/resetPasswordForm/component";





@NgModule({
  imports:[
    NgbModule,
    // HttpClientModule,

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
    NgxPageScrollModule,
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
    AboutComponent,
    CommunitiesComponent,
    CopyComponent,
    GeolocationComponent,
    SearchBarComponent,
    HomePageComponent,
    SearchOsmComponent,
    EmailNotificationSettingsComponent,
    CityBarComponent,
    PasswordStrengthBarComponent,
    CommunityComponent,
    ResetPasswordFormComponent,
    SendPasswordConfirmationEmailComponent
  ],
  declarations: [
    HeaderComponent,
    SubscribeComponent,
    UserComponent,
  	ClientComponent,
    ProfilComponent,
    ProfilSettingsComponent,
    SettingsComponent,
    ConfirmModaleComponent,
    ReadMoreComponent,
    MentionsComponent,
    AboutComponent,
    CommunitiesComponent,
    CopyComponent,
    GeolocationComponent,
    SearchComponent,
    ChatMessageComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    FromNowPipe,
    SearchBarComponent,
    HomePageComponent,
    SearchOsmComponent,
    EmailNotificationSettingsComponent,
    CityBarComponent,
    PasswordStrengthBarComponent,
    CommunityComponent,
    ResetPasswordFormComponent,
    SendPasswordConfirmationEmailComponent

  ],
  providers : [
    {
        provide: GPPDService,
        useFactory: GPPDFactory,
        deps: [HttpClient ]
    },
    PeriodService,
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
