import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Logged } from '~/core/services/logged';
import { IconService } from '~/core/services/icon.service';
import { MessagesService } from '~/modules/chat/services/messages';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';

import { DomainService } from './core/services/domain';


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
      public messagesService: MessagesService,
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
          const url = `http://localhost:3000/.well-known/mercure?topic=https://wecolearn.com/message`;
          const subscribeToMercureNotifs = new EventSource(encodeURI(url), { withCredentials: true }).onmessage = (evt: MessageEvent) => {
            const message = new Message(JSON.parse(evt.data));
            message.thread = new Thread({
              id: message.sender.id,
              name: message.sender.first_name,
              image: message.sender.image,
            });
            this.messagesService.addMessage(message);
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

