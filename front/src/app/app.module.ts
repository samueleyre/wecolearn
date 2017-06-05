import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';
import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';
import { NgbModule }       from '@ng-bootstrap/ng-bootstrap';


import { ApplicativeModule }	from './applicativeService/module'; 

import { AppComponent }		  from './app.component'
import { LoginComponent }	  from './components/login/component';
import { HomeComponent }	  from './components/home/component';
import { UserComponent }    from './components/user/component';

import { EqualValidator }    from './applicativeService/form/validator/equalValidator';

import { routing }			    from './applicativeService/routing/app.routing';

@NgModule({
  imports:[   
  			ApplicativeModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterModule,
         
  ],
  declarations: [ 
  				LoginComponent,
        	HomeComponent,
          UserComponent,
          EqualValidator,
        	AppComponent,

  ],
  bootstrap:[ 
  	AppComponent 
  ],
})
export class AppModule { }
