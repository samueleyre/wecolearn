import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { 	
			//HttpModule, 
			Http, 
			XHRBackend, 
			RequestOptions
		} 					from '@angular/http';

import { AppComponent }  	from './app.component';

import { httpFactory }		from './applicativeService/interceptor/httpFactory';

@NgModule({
  imports:      [   
  					BrowserModule,
  					//HttpModule 
  				],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ]
})
export class AppModule { }
