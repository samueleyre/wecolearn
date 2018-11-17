import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import '@angular/material/prebuilt-themes/indigo-pink.css'; // is this usefull ????
import {Router} from '@angular/router';
import {LoggerService} from './applicativeService/logger/service';
import { MessagesService } from './service/messages';
import { NavigationEnd } from '@angular/router';
import {SearchService} from './service/search';
import {DomainService} from './service/domain';
import {GPPDComponent} from './components/component/gppd';
import {SeoService} from './service/seo';


@Component({
  selector: 'app-wecolearn',
  templateUrl	: 'app.component.html',
  styleUrls : ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit {
  private loaded = false;
  private hideLoader = false;
  private hideHeader = true;
  private smallLoader = true;
  private location: string;
  private refreshed = false;
  public subDomain = '';
  private themeCssUrl: string;

  constructor(
      private router: Router,
      private domainService: DomainService,
      private loggerService: LoggerService,
      public messagesService: MessagesService,
      private searchService: SearchService,
      private seoService: SeoService,
  ) {
    this.setThemeCss();
    this.location = this.router.url;
    router.events.subscribe(event => {
      this.domainService.setSubDomain();
      this.setThemeCss();

      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/search') {
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

  initLoader(size: string = null) {
    this.loaded = false;
    this.hideLoader = false;
    if (this.refreshed)
      this.smallLoader = true;
  }

  ngOnInit() {
    this.hideLoaderFunction();
  }

  setThemeCss() {
    const domain = this.domainService.getSubDomain();
    this.themeCssUrl = GPPDComponent.updateUrl('/css/theme/' + domain + '.css');
    this.seoService.updateTitle(domain);
  }


  hideLoaderFunction() {
    if (false === this.loaded) {
      setTimeout(() => {
        this.loaded = true;
        this.hideHeader = false;
        setTimeout(() => {
          this.hideLoader = true;
          this.refreshed = true;
        }, 1000);
      }, 1000);

    }
  }


}

