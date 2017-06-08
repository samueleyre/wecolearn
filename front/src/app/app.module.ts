import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';
import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';
import { NgbModule }       from '@ng-bootstrap/ng-bootstrap';

import { PopinConfirmService }     from './applicativeService/popin/confirm/service';
import { PopinConfirmModule }     from './applicativeService/popin/confirm/module';


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
        PopinConfirmModule,
         
  ],
  declarations: [ 
  				LoginComponent,
        	HomeComponent,
          UserComponent,
          EqualValidator,
        	AppComponent,
  ],
  providers : [
    //PopinConfirmService
  ],
  bootstrap:[ 
  	AppComponent 
  ],
})
export class AppModule { }
