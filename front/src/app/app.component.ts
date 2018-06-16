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
    private hideloader = true;
    private hideHeader = false;
    private location: Location;

    constructor(
       private router: Router,
       location: Location,
       private loggerService: LoggerService
    ) {
        this.location = location;
        router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.loggerService.log("route changed", event)
            this.initLoader();
            this.load()
          }
        });
    }

    initLoader() {
      this.loaded = false;
      this.hideloader = false;
    }

    ngOnInit() {
    }

    load() {
       this.hideLoader();
    }

    hideLoader() {
      if (false === this.loaded)
        setTimeout(()=>{
          this.loaded = true;
          this.hideHeader = false;
          setTimeout(()=>{
            this.hideloader = true;
          }, 1000);
        },1000);
    }





    }

