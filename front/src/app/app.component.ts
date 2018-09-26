import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';

// import './../assets/css/styles.css';
import './../../node_modules/loaders.css/loaders.min.css';
import '@angular/material/prebuilt-themes/indigo-pink.css'; // is this usefull ????
import {APP_BASE_HREF, Location} from "@angular/common";
import {Router} from "@angular/router";
import {log} from "util";
import {LoggerService} from "./applicativeService/logger/service";
// import { CookieLawModule } from 'angular2-cookie-law';
import { MessagesService } from './wc/service/messages';


import { NavigationEnd } from '@angular/router';
import {SearchService} from "./wc/service/search";
import {DomainService} from "./wc/service/domain";


@Component({
  selector: 'my-app',
  templateUrl	: 'app.template.html',
  styleUrls : ['./app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit {
    private loaded = false;
    private hideLoader = false;
    private hideHeader = true;
    private smallLoader = true;
    private location: string;
    private refreshed = false;
    public subDomain = "main";

    constructor(
       private router: Router,
       // private location: Location,
       private domainService: DomainService,
       private loggerService: LoggerService,
       public messagesService: MessagesService,
       private searchService: SearchService,
    ) {
      // this.loggerService.log("location ", this.router.url)
      this.location = this.router.url;
      router.events.subscribe(event => {
          // this.loggerService.log("route changed", event)
        this.domainService.setSubDomain()
        // console.log("ON EVERY LOAD ? ?? ?", this.domainService.setSubDomain())

          if (event instanceof NavigationEnd) {
            // this.loggerService.log("route changed", event, event.urlAfterRedirects)
            if (event.urlAfterRedirects === "/search") {
              this.messagesService.changePeriod(15000);
            } else {
              this.messagesService.changePeriod(120000);
              this.searchService.cancelChangePageAfterSearch();
            }
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

