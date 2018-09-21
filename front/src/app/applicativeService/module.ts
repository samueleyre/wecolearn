import { NgModule }      	          from '@angular/core';
import { HttpModule }               from '@angular/http';
import { Router }                   from '@angular/router';



import { LocalStorageModule }       from 'angular-2-local-storage';

import {   
      HttpClient
    }                              from '@angular/common/http';

import { MessageModule }           from './message/module';

  
import { AuthenticationService}    from './authentication/service';
import { AuthGuard }               from './authguard/service';
// import { AuthGuardSearch }               from './authguard/service';
import { environment  }            from './config/environment';
import { ApplicationHttpClient }         from './interceptor/InterceptedHttp';
import { httpClientFactory }             from './interceptor/httpClientFactory';
import {HttpErrorInterceptor, HttpErrorInterceptorProvider} from './interceptor/HttpErrorInterceptor';
import { routing }                 from './routing/app.routing';
import { TokenService }            from './token/service';
import { UserService }             from './user/service';
import { HeaderBag }               from './interceptor/header-bag'

import { FilterComponent }          from './filter/component';
import { FilterService }          from './filter/service';
import { PingService }                             from  './ping/service';

@NgModule({
  imports:[   
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
        MessageModule,
        routing,
        // HttpErrorInterceptor,
        // ApplicationHttpClient
  ],
  exports : [
    MessageModule,
    FilterComponent    

  ]
  ,declarations: [ 
    FilterComponent,				  
  ],
  providers: [
        // {
        //   provide: ApplicationHttpClient,
        //   useFactory: httpClientFactory,
        //   deps: [HttpClient]
        // },
        // HttpErrorInterceptorProvider,
        AuthenticationService,
        AuthGuard,
        TokenService,
        UserService,
        HeaderBag,
        FilterService,
        PingService
    ],
})
export class ApplicativeModule { }
