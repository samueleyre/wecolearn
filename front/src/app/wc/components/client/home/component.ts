import {Component, Inject, OnInit} from '@angular/core';
import { AuthenticationService } from './../../../../applicativeService/authentication/service';
import {GPPDComponent} from "../../../../wc/component/gppd";
import {FilterService} from "../../../../applicativeService/filter/service";
import { SearchService }         from './../../../service/search';
import {Router} from "@angular/router";


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
        private router: Router

    ) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.webPath = GPPDComponent.updateUrl('/');
        this.homeBgImageStyle = {
          backgroundImage: "url('"+this.webPath+"home/P3.jpg')"
        };
        this.screen =  GPPDComponent.getScreenSize();

    }

    search(text:string = null) {

      FilterService.addFilter("tag", text);

      this.searchService.search().subscribe(
        () =>{
          FilterService.clear();
          this.router.navigate(['/search']);
        }
      );
    }
}