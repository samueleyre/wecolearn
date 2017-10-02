import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF, Location } from '@angular/common';
import { getBaseLocation } from './applicativeService/base_url/base_url';

import { BsDropdownModule }         from 'ngx-bootstrap';
import {UploadModule}           from './applicativeService/upload/module';

import { PopinConfirmService }      from './applicativeService/popin/confirm/service';
import { PopinConfirmModule }       from './applicativeService/popin/confirm/module';
import { EqualValidator }           from './applicativeService/form/validator/equalValidator';
import { routing }          from './applicativeService/routing/app.routing';


import { ApplicativeModule }	from './applicativeService/module'; 

import { AppComponent }		  from './app.component'
import { LoginComponent }	  from './components/login/component';
import { HomeComponent }	  from './components/home/component';
import { UploadComponent}          from './applicativeService/upload/component';
import { NotFoundComponent}          from './components/notFound/component';

import { PrModule }          from './pr/module';


import { AuthGuard }         from './applicativeService/authguard/service';

import { LoadersCssModule } from 'angular2-loaders-css';

import { LOCALE_ID } from '@angular/core';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
];

@NgModule({
  imports:[   
  			//ApplicativeModule,
        BrowserModule,
        FormsModule,
        HttpModule,

        NgbModule.forRoot(),
        PrModule,
        RouterModule.forRoot(appRoutes),
        //route,
        PopinConfirmModule,
        routing,
        BsDropdownModule.forRoot(),
        UploadModule,
      LoadersCssModule,
  ],
  declarations: [ 
        LoginComponent,
        HomeComponent,
        // UserComponent,
        EqualValidator,
        AppComponent,
        NotFoundComponent
  ],
  providers : [
      {
          provide: APP_BASE_HREF,
          useFactory: getBaseLocation,
      },
      { provide: LOCALE_ID, useValue: "fr-FR" }, //replace "en-US" with your locale
  ],
  bootstrap:[ 
  	AppComponent
  ],
})
export class AppModule { }
