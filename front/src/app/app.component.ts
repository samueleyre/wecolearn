import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Logged } from '~/shared/services/logged';
import { MessagerieService } from '~/shared/services/messagerie/service';

import { SearchService } from './modules/search/services/search';
import { DomainService } from './shared/services/domain';
import { SeoService } from './shared/services/seo';


@Component({
  selector: 'app-wecolearn',
  templateUrl: 'app.component.html',
  styleUrls : ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
      private router: Router,
      private domainService: DomainService,
      private searchService: SearchService,
      private seoService: SeoService,
      private sanitizerService: DomSanitizer,
      private messagerieService: MessagerieService,

  ) {
    // set subdomain
    router.events.subscribe((event) => {
      this.domainService.setSubDomain();
    });

    this.initMessagerieService();
  }

  private initMessagerieService() {
    let oldLog = false;
    Logged.get().subscribe(
      (logged) => {
        const subs: any = { unsubscribe : null };
        if (logged && !oldLog) {
          // todo: repare this
          // subs = this.messagerieService.init().subscribe(
          //   (available) => {
          //     console.log(available);
          //     this.messagerieService.setStatus(available);
          //   });
        } else if (!logged && typeof subs.unsubscribe === 'function') {
          subs.unsubscribe();
        }
        oldLog = logged;
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        console.log('completed ========');
      });
  }
}

