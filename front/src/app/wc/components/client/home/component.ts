import {Component, Inject, OnInit} from '@angular/core';
import { AuthenticationService } from './../../../../applicativeService/authentication/service';
import {GPPDComponent} from "../../../../wc/component/gppd";
import {FilterService} from "../../../../applicativeService/filter/service";
import { SearchService }         from './../../../service/search';
import {Router} from "@angular/router";
import {Logged} from "../../../../applicativeService/authguard/logged";
import {LoggedService} from "../../../service/logged";
import {LoggerService} from "../../../../applicativeService/logger/service";


@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class HomeComponent implements OnInit {

    private homeBgImageStyle: any;
    public screen: boolean =  false;
    private webPath: string;
    private tagLinks = [
      {
        tagName: "php"
      },{
        tagName: "javascript"
      },{
        tagName: "ruby"
      },{
        tagName: "angularJs"
      },{
        tagName: "symfony"
      }
      ];

    constructor(
        private authenticationService: AuthenticationService,
        private searchService: SearchService,
        private router: Router,
        private LoggedService: LoggedService,
        private loggerService: LoggerService


    ) {}

    ngOnInit() {
        // reset login status
        this.webPath = GPPDComponent.updateUrl('/');
        this.homeBgImageStyle = {
          backgroundImage: "url('"+this.webPath+"home/P3.jpg')"
        };
        this.screen =  GPPDComponent.getScreenSize();

        if (this.LoggedService.get()) {
          this.loggerService.log("home --> search")
          this.router.navigate(['/search']);
        }

        /*Logged.get().subscribe( (logged:boolean) => { // when this is uncommented it makes a loop on login
          if (logged) {
            this.loggerService.log("hom2e --> search")
            this.router.navigate(['/search']);
          }
        });*/

    }

    search(text:string = null) {

      FilterService.addFilter("tag", text);

      this.searchService.search().subscribe(
        () =>{
          this.loggerService.log("home --> should navigate to search")
          this.router.navigate(['/search']);
        }
      );
    }
}