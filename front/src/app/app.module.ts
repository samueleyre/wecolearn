import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';

import { ApplicativeModule }	from './applicativeService/module'; 

import { AppComponent }		from './app.component'
import { LoginComponent }	from './components/login/component';
import { HomeComponent }	from './components/home/component';

import { routing }			from './applicativeService/routing/app.routing';

@NgModule({
  imports:[   
  			BrowserModule,
  			FormsModule,
  			ApplicativeModule,
  			RouterModule,
  			HttpModule, 
  ],
  declarations: [ 
  				LoginComponent,
        	HomeComponent,
        	AppComponent,
  ],
  bootstrap:[ 
  	AppComponent 
  ],
})
export class AppModule { }
