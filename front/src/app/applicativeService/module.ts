import { NgModule }      	          from '@angular/core';
import { HttpModule }               from '@angular/http';
import { Router }                   from '@angular/router';



import { LocalStorageModule }       from 'angular-2-local-storage';

import {   
      //HttpModule, 
      Http, 
      XHRBackend, 
      RequestOptions
    }                              from '@angular/http';

import { MessageModule }           from './message/module';

  
import { AuthenticationService}    from './authentication/service';
import { AuthGuard }               from './authguard/service';
import { environment  }            from './config/environment';
import { InterceptedHttp }         from './interceptor/InterceptedHttp';
import { httpFactory }             from './interceptor/httpFactory';
import { routing }                 from './routing/app.routing';
import { TokenService }            from './token/service';
import { UserService }             from './user/service';
import { HeaderBag }               from './interceptor/header-bag'

import { FilterComponent }          from './filter/component';
import { FilterService }          from './filter/service';

@NgModule({
  imports:[   
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
        MessageModule,
        routing,
        
  ],
  exports : [
    MessageModule,
    FilterComponent    

  ]
  ,declarations: [ 
    FilterComponent,				  
  ],
  providers: [
        {
            provide: Http,
            useFactory:   httpFactory,
            deps: [XHRBackend, RequestOptions, TokenService, Router, HeaderBag ]
        },
        AuthenticationService,
        AuthGuard,
        InterceptedHttp,
        TokenService,
        UserService,
        HeaderBag,
        FilterService,
        //XHRBackend, 
        //RequestOptions,
    ],
})
export class ApplicativeModule { }
