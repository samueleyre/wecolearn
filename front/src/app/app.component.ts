import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Logged } from '~/core/services/logged';
import { MessagerieService } from '~/core/services/messagerie/service';
import { IconService } from '~/core/services/icon.service';

import { SearchService } from './modules/search/services/search';
import { DomainService } from './core/services/domain';
import { SeoService } from './core/services/seo';


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
      private iconService: IconService,
  ) {
    // set subdomain
    router.events.subscribe((event) => {
      this.domainService.setSubDomain();
    });

    this.initMessagerieService();
    this.iconService.init();
  }

  private initMessagerieService() {
    let oldLog = false;
    Logged.get().subscribe(
      (logged) => {
        const subs: any = { unsubscribe : null };
        if (logged && !oldLog) {
          // subscribe to notifications
          const url = `http://localhost:3000/.well-known/mercure?topic=http://monsite.com/ping`;
          const subscribeToMercureNotifs = new EventSource(encodeURI(url), { withCredentials: true }).onmessage = (evt: MessageEvent) => {
            console.log('message', evt.data);
          };


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

