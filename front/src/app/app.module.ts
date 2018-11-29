import {BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {APP_BASE_HREF, CommonModule, Location} from '@angular/common';
import {getBaseLocation } from './applicativeService/base_url/base_url';
import {UploadModule} from './applicativeService/upload/module';
import {MessageModule } from './applicativeService/message/module';
import {EqualValidator } from './applicativeService/form/validator/equalValidator';
import {AppComponent } from './app.component';
import {LoginComponent } from './components/login/component';
import {ConfirmEmailComponent} from './components/confirmEmail/component';
import {HomeComponent } from './components/client/home/component';
import {NotFoundComponent} from './components/notFound/component';
import {LoadersCssModule } from 'angular2-loaders-css';
import {LOCALE_ID } from '@angular/core';
import {LoggerService } from './applicativeService/logger/service';
import {AutofocusDirective} from './applicativeService/form/input/directive';
import {ThreadsService} from './service/threads.service';
import {MessagesService} from './service/messages';
import {ClientService} from './service/client';
import {DomainService} from './service/domain';
import {SeoService} from './service/seo';
import {HeaderComponent} from './components/header/component';
import {SubscribeComponent} from './components/client/subscribe/component';
import {UserComponent} from './components/user/component';
import {ClientComponent} from './components/bo/clientsPage/client/component';
import {ProfilComponent} from './components/client/profilPage/profil/component';
import {ProfilSettingsComponent} from './components/client/profilPage/profilSettings/component';
import {SettingsComponent} from './components/client/settings/component';
import {ConfirmModaleComponent} from './applicativeService/popin/confirm/component';
import {ReadMoreComponent} from './applicativeService/readMore/component';
import {MentionsComponent} from './components/client/mentionslegales/component';
import {AboutComponent} from './components/client/about/component';
import {CommunitiesComponent} from './components/client/communities/component';
import {CopyComponent} from './applicativeService/copy/component';
import {GeolocationComponent} from './components/client/profilPage/geolocation/component';
import {SearchComponent} from './components/client/searchPage/search/component';
import {ChatMessageComponent} from './components/client/chat/chat-message/chat-message.component';
import {ChatThreadComponent} from './components/client/chat/chat-thread/chat-thread.component';
import {ChatThreadsComponent} from './components/client/chat/chat-threads/chat-threads.component';
import {ChatWindowComponent} from './components/client/chat/chat-window/chat-window.component';
import {FromNowPipe} from './service/from-now.pipe';
import {SearchBarComponent} from './components/client/searchBar/component';
import {HomePageComponent} from './components/client/home/page/component';
import {SearchOsmComponent} from './components/client/profilPage/searchOsm/component';
import {EmailNotificationSettingsComponent} from './components/client/settings/notifications/component';
import {CityBarComponent} from './components/client/cityBar/component';
import {PasswordStrengthBarComponent} from './applicativeService/form/password/component';
import {CommunityComponent} from './components/client/communities/community/component';
import {ResetPasswordFormComponent} from './components/resetPassword/resetPasswordForm/component';
import {SendPasswordConfirmationEmailComponent} from './components/resetPassword/sendConfirmationEmail/component';
import {CardComponent} from './components/client/searchPage/card/component';
import {WcTagInputComponent} from './components/client/profilPage/profilSettings/tagInput/component';
import {GPPDService} from './service/gppd';
import {GPPDFactory} from './service/gppd.factory';
import {PeriodService} from './service/period';
import {SearchService} from './service/search';
import {TagService} from './service/tag';
import {LoggedService} from './service/logged';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MomentModule} from "angular2-moment";
import {MatNativeDateModule} from "@angular/material";
import {BootstrapModalModule} from "ngx-modialog/plugins/bootstrap";
import {ModalModule} from "ngx-modialog";
import {QuillModule} from "ngx-quill";
import {NgxPageScrollModule} from "ngx-page-scroll";
import {Ng2ImgMaxModule} from "ng2-img-max";
import {AgmCoreModule} from "@agm/core";
import {environment} from "../environments/environment";
import {TagInputModule} from "ngx-chips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import {LocalStorageModule} from "angular-2-local-storage";
import {FilterComponent} from "./applicativeService/filter/component";
import {HttpApiInterceptor} from "./applicativeService/interceptor/httpApiInterceptor";
import {AuthenticationService} from "./applicativeService/authentication/service";
import {AuthGuard} from "./applicativeService/authguard/service";
import {TokenService} from "./applicativeService/token/service";
import {UserService} from "./applicativeService/user/service";
import {HeaderBag} from "./applicativeService/interceptor/header-bag";
import {FilterService} from "./applicativeService/filter/service";
import {PingService} from "./applicativeService/ping/service";
import {WcRoutingModule} from "./app-routing.module";




const appRoutes: Routes = [
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MessageModule,
    UploadModule,  // is this used ?
    LoadersCssModule,
    NgbModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule,
    MatNativeDateModule,
    MomentModule,
    RouterModule,
    QuillModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxMyDatePickerModule.forRoot(),
    NgxPageScrollModule,
    Ng2ImgMaxModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ["places"]
    }),
    TagInputModule,
    BrowserAnimationsModule,
    NguiAutoCompleteModule,
    InfiniteScrollModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    MessageModule,
    WcRoutingModule

  ],
  declarations: [
    LoginComponent,
    ConfirmEmailComponent,
    HomeComponent,
    EqualValidator, // not working
    AutofocusDirective,
    AppComponent,
    NotFoundComponent,
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
    SendPasswordConfirmationEmailComponent,
    CardComponent,
    WcTagInputComponent,
    FilterComponent,


  ],
  providers : [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // replace 'en-US' with your locale
    {
      provide: GPPDService,
      useFactory: GPPDFactory,
      deps: [HttpClient ]
    },
    PeriodService,
    SearchService,
    TagService,
    LoggedService,
    LoggerService,
    ThreadsService,
    MessagesService,
    ClientService,
    DomainService,
    SeoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },

    AuthenticationService,
    AuthGuard,
    TokenService,
    UserService,
    HeaderBag,
    FilterService,
    PingService
  ],
  bootstrap: [
    AppComponent,
    // ConfirmModaleComponent,
    // GeolocationComponent,
  ],
})
export class AppModule { }
