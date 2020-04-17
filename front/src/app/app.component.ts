import { Component, NgZone, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Logged } from '~/core/services/auth/logged';
import { IconService } from '~/core/services/icon.service';
import { MessagesService } from '~/modules/chat/services/messages';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';
import { MessagerieService } from '~/core/services/messagerie/service';
import { navTitles } from '~/config/navigation/seo.const';
import { SeoService } from '~/core/services/seo';
import { NAV } from '~/config/navigation/nav';

import { DomainService } from './core/services/domain/domain';
import { environment } from '../environments/environment';
import {SeoService} from "~/core/services/seo";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { registerWebPlugin } from '@capacitor/core';
import {Image} from "~/core/entities/image/entity";

const { PushNotifications } = Plugins;


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
      private _deviceService: DeviceDetectorService,
      private iconService: IconService,
      private _seoService: SeoService,
      private _zone: NgZone,
      private _threadService: Threads,
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
          // todo : move this to a dedicated service

          // subscribe to notifications
          const url = `${environment.mercureUrl}?topic=https://wecolearn.com/message`;
          new EventSource(encodeURI(url), { withCredentials: true }).onmessage = (evt: MessageEvent) => {
            const message = new Message(JSON.parse(evt.data));
            message.thread = new Thread({
              id: message.sender.id,
              name: message.sender.first_name,
              image: message.sender.image,
            });
            this._zone.run(() => {
              if (
                this._threadService.currentThread.getValue().id === message.sender.id
                && (
                  this.router.url === NAV.currentDiscussion && this._deviceService.isMobile()
                  || this.router.url === NAV.discussion && this._deviceService.isDesktop()
                )
              ) {
                message.is_read = true;
              }
              this.messagesService.addMessage(message);
            });
          };

          try {
            PushNotifications.addListener('pushNotificationReceived',
                                          (notification: PushNotification) => {
                console.log('nottification receiveed ######## ' + JSON.stringify(notification));
                this._zone.run(() => {
                  const message = new Message(JSON.parse(notification.body));
                  message.thread = new Thread({
                    id: message.sender.id,
                    name: message.sender.first_name,
                    image: message.sender.image,
                  });
                  this.messagesService.addMessage(message);
                });
              },
            );

            PushNotifications.addListener('pushNotificationActionPerformed',
                                          (notification: PushNotificationActionPerformed) => {
                console.log('########notif####### action performed' + JSON.stringify(notification));
                this._zone.run(() => {
                  this.router.navigateByUrl('/dashboard/discussion');
                });
              });
          } catch (error) {
            console.log(error);
          }

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

