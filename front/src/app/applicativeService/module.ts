import {  NgModule }      	from '@angular/core';
import {  HttpModule } from '@angular/http';

import {   
      //HttpModule, 
      Http, 
      XHRBackend, 
      RequestOptions
    }                           from '@angular/http';


import { AuthenticationService} from './authentication/service';
import { AuthGuard }            from './authguard/service';
import { environment  }          from './config/environment';
import { InterceptedHttp }        from './interceptor/InterceptedHttp';
import { httpFactory }            from './interceptor/httpFactory';
import { routing }                from './routing/app.routing';
import { TokenService }            from './token/service';

@NgModule({
  imports:[   
  			routing,
        HttpModule,
  ],
  
  declarations: [ 
  				  
            
  ],
  providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
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
