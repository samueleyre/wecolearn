import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import { NgModule }                 from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';

import { APP_BASE_HREF, Location } from '@angular/common';
import { getBaseLocation } from './applicativeService/base_url/base_url';

// import { BsDropdownModule }         from 'ngx-bootstrap';
import {UploadModule}           from './applicativeService/upload/module';

import { MessageModule }       from './applicativeService/message/module';
import { EqualValidator }           from './applicativeService/form/validator/equalValidator';
import { routing }          from './applicativeService/routing/app.routing';


// import { ApplicativeModule }	from './applicativeService/module';

// import { MessageComponent}       from './applicativeService/message/component';
import { AppComponent }		  from './app.component'
import { LoginComponent }	  from './components/login/component';
import { ConfirmEmailComponent}	  from './components/confirmEmail/component';

import { HomeComponent }	  from './wc/components/client/home/component';
// import { UploadComponent}          from './applicativeService/upload/component';
import { NotFoundComponent}          from './components/notFound/component';

// import {PasswordStrengthBarComponent} from './applicativeService/form/password/component';


import { WcModule }          from './wc/module';


// import { AuthGuard }         from './applicativeService/authguard/service';

import { LoadersCssModule } from 'angular2-loaders-css';

import { LOCALE_ID } from '@angular/core';
// import {CookieLawModule} from "angular2-cookie-law";


//SERVICES -------------
import { LoggerService }       from './applicativeService/logger/service';
import {AutofocusDirective} from "./applicativeService/form/input/directive";
import {ThreadsService} from "./wc/service/threads.service";
import {MessagesService} from "./wc/service/messages";
import {ClientService} from "./wc/service/client";
import {DomainService} from "./wc/service/domain";
// import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
// import {TokenService} from "./applicativeService/token/service";



const appRoutes: Routes = [
];

@NgModule({
  imports:[   
    BrowserModule,
    FormsModule,
    HttpModule,

    NgbModule.forRoot(),
    WcModule,
    RouterModule.forRoot(appRoutes),
    MessageModule,
    routing,
    // BsDropdownModule.forRoot(),
    UploadModule,  // is this used ?
    LoadersCssModule,

  ],
  declarations: [ 
    LoginComponent,
    ConfirmEmailComponent,
    HomeComponent,
    // UserComponent,
    EqualValidator, // not working
    AutofocusDirective,
    // PasswordStrengthBarComponent,
    AppComponent,
    NotFoundComponent

  ],
  providers : [
      {
          provide: APP_BASE_HREF,
          useFactory: getBaseLocation,
      },
      { provide: LOCALE_ID, useValue: "fr-FR" }, //replace "en-US" with your locale
      LoggerService,
      ThreadsService,
      MessagesService,
      ClientService,
      DomainService


  ],
  bootstrap:[ 
  	AppComponent
  ],
})
export class AppModule { }
