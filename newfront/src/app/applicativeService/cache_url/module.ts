import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';


import { CacheUrlService }        from './service';
import { CacheService }           from 'ng2-cache/ng2-cache';
import { PaginationService }      from './../pagination/service';


@NgModule({
  imports:[
    BrowserModule  	   
  ],
  exports : [
    
  ],
  declarations:[ 
    
  ],
  providers: [
    CacheUrlService,
    CacheService,
    PaginationService,
  ],
  entryComponents: [
  ]
})  
export class CacheUrlModule { }
