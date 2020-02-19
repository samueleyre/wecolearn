import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { Logged } from '~/core/services/logged';
import { IconService } from '~/core/services/icon.service';
import { MessagesService } from '~/modules/chat/services/messages';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';
import { MessagerieService } from '~/core/services/messagerie/service';
import { navTitles } from '~/config/navigation/seo.const';

import { DomainService } from './core/services/domain';
import { environment } from '../environments/environment';
import {SeoService} from "~/core/services/seo";


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
      private _seoService: SeoService,
      public messagesService: MessagesService,
      public messagerieService: MessagerieService,
  ) {
    // set subdomain
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.domainService.setSubDomain();
        this._seoService.updateSeoTitleAndTags(event.urlAfterRedirects);
      });

    this.initMessagerieService();
    this.iconService.init();
  }

  private initMessagerieService() {
    let oldLog = false;
    Logged.get().subscribe(
      (logged) => {
        let subs: any = { unsubscribe : null };
        if (logged && !oldLog) {
          // subscribe to notifications
          const url = `${environment.mercureUrl}?topic=https://wecolearn.com/message`;
          new EventSource(encodeURI(url), { withCredentials: true }).onmessage = (evt: MessageEvent) => {
            const message = new Message(JSON.parse(evt.data));
            message.thread = new Thread({
              id: message.sender.id,
              name: message.sender.first_name,
              image: message.sender.image,
            });
            this.messagesService.addMessage(message);
          };

          subs = this.messagerieService.init().subscribe(
            (available) => {
              this.messagerieService.setStatus(available);
            });
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

