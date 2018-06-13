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




@Component({
  selector: 'my-app',
  templateUrl	: 'app.template.html',
  // styleUrls : ['./../assets/css/loader.css']
})
export class AppComponent  implements OnInit {
    private loaded = false;
    private hideloader = false;
    private location: Location;
    private hideHeader = true;

    constructor(
                 private router: Router,
                 location: Location,
                 private loggerService: LoggerService
    ) {
        this.location = location;
        router.events.subscribe(event => {
            this.loggerService.log("route changed")
            this.load()
            }
        );
    }



    ngAfterViewInit() {
      setTimeout(()=>{
        this.loaded = true;
          setTimeout(()=>{
            this.hideloader = true;
          }, 1000);
      },1000);
    }

    ngOnInit() {
      this.load();
    }

    load() {
        let path = this.location.path();
        if (path === "") {
          this.hideHeader = true;
        } else {
          this.hideHeader = false;
        }

    }





    }

