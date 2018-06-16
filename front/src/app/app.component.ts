import {Component, Inject, OnInit} from '@angular/core';

import './../assets/css/styles.css';
import './../assets/css/loader.css';
import './../../node_modules/loaders.css/loaders.min.css';
import '@angular/material/prebuilt-themes/indigo-pink.css';
import {APP_BASE_HREF, Location} from "@angular/common";
import {Router} from "@angular/router";
import {log} from "util";
import {LoggerService} from "./applicativeService/logger/service";
// import { CookieLawModule } from 'angular2-cookie-law';


import { NavigationEnd } from '@angular/router';


@Component({
  selector: 'my-app',
  templateUrl	: 'app.template.html',
  // styleUrls : ['./../assets/css/loader.css']
})
export class AppComponent  implements OnInit {
    private loaded = false;
    private hideLoader = false;
    private hideHeader = true;
    private smallLoader = true;
    private location: string;
    private refreshed = false;

    constructor(
       private router: Router,
       location: Location,
       private loggerService: LoggerService
    ) {
      this.loggerService.log("location ", this.router.url)
      this.location = this.router.url;
      router.events.subscribe(event => {
          this.loggerService.log("route changed", event)

          if (event instanceof NavigationEnd) {
            this.loggerService.log("route changed", event, this.location)
            if (this.refreshed)
              this.initLoader();
            this.hideLoaderFunction();
          }
        });
    }

    initLoader(size:string = null) {
      this.loaded = false;
      this.hideLoader = false;
      if (this.refreshed)
        this.smallLoader = true;
    }

    ngOnInit() {
        this.hideLoaderFunction();
    }

  hideLoaderFunction() {
      if (false === this.loaded) {
          setTimeout(()=>{
            this.loaded = true;
            this.hideHeader = false;
            setTimeout(()=>{
              this.hideLoader = true;
              this.refreshed = true;
            }, 1000);
          },1000);

      }
    }





    }

