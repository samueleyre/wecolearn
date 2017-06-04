import { NgModule }      	          from '@angular/core';
import { HttpModule }               from '@angular/http';
import { LocalStorageModule }       from 'angular-2-local-storage';

import {   
      //HttpModule, 
      Http, 
      XHRBackend, 
      RequestOptions
    }                              from '@angular/http';
  
import { AuthenticationService}    from './authentication/service';
import { AuthGuard }               from './authguard/service';
import { environment  }            from './config/environment';
import { InterceptedHttp }         from './interceptor/InterceptedHttp';
import { httpFactory }             from './interceptor/httpFactory';
import { routing }                 from './routing/app.routing';
import { TokenService }            from './token/service';

@NgModule({
  imports:[   
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
        routing
  ],
  
  declarations: [ 
  				  
            
  ],
  providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, TokenService ]
        },
        AuthenticationService,
        AuthGuard,
        InterceptedHttp,
        TokenService,
        //XHRBackend, 
        //RequestOptions,
    ],
})
export class ApplicativeModule { }
