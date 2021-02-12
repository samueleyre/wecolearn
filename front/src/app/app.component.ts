import { AfterViewInit, Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { DeeplinkMatch } from '@ionic-native/deeplinks';
import { Platform } from '@ionic/angular';

import { Logged } from '~/core/services/auth/logged';
import { IconService } from '~/core/services/icon.service';
import { MessagesService } from '~/core/services/chat/messages.service';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';
import { MessagerieService } from '~/core/services/messagerie/service';
import { ThreadsService } from '~/core/services/chat/threads.service';
import { SeoService } from '~/core/services/seo';
import { User } from '~/core/entities/user/entity';

import { DomainService } from './core/services/domain/domain';
import { environment } from '../environments/environment';

const { PushNotifications } = Plugins;


@Component({
  selector: 'app-wecolearn',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
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
    private _threadService: ThreadsService,
    public messagesService: MessagesService,
    public messagerieService: MessagerieService,
    private _deeplinks: Deeplinks,
    private _platform: Platform,
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
    Logged.get().pipe(distinctUntilChanged()).subscribe(
      (logged) => {
        let subs: any = { unsubscribe: null };

        if (environment.android) {
          // manage deeplinks on android
          this._platform.ready().then(() => {
            this._deeplinks.route(
              {}).subscribe(
              (match: DeeplinkMatch) => {
                console.log('Successfully matched route', JSON.stringify(match));
              },
              (nomatch) => {
                console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
                const path = nomatch.$link.url.replace('https://wecolearn.com', '');
                console.log('path', path);
                this.router.navigateByUrl(path);

              });
          });
        }

        if (logged) {
          // get all messages every time logged or app is reloaded
          this.messagesService.initMessages();

          // subscribe to mercure updates
          if (!environment.android) {
            const url = `${environment.mercureUrl}?topic=${environment.publique}/message`;
            new EventSource(encodeURI(url), { withCredentials: true }).onmessage = (evt: MessageEvent) => {
              const data = JSON.parse(evt.data);
              if ('message' in data) {
                const message = new Message(data.message);
                message.thread = new Thread({
                  id: message.sender.id,
                  name: message.sender.first_name,
                  image: message.sender.image,
                });
                this._zone.run(() => {
                  this.messagesService.addMessage(message);
                });
              }
              if ('is_read' in data) {
                this.messagesService.updateIsRead.next(new Message(data.is_read));
              }
            };
          }

          if (environment.android) {
            // subscribe to android notifications
            try {
              PushNotifications.addListener(
                'pushNotificationReceived',
                (notification: PushNotification) => {
                  console.log('notification received ######## ' + JSON.stringify(notification));

                  // if message
                  if ('message' in notification.data) {
                    this._zone.run(() => {
                      const message = new Message(JSON.parse(notification.data.message));
                      message.thread = new Thread({
                        id: message.sender.id,
                        name: message.sender.first_name,
                        image: message.sender.image,
                      });
                      this.messagesService.addMessage(message);
                    });
                  }

                  // if is_read
                  if ('is_read' in notification.data) {
                    this._zone.run(() => {
                      this.messagesService.updateIsRead.next(new Message(JSON.parse(notification.data.message)));
                    });
                  }
                },
              );

              PushNotifications.addListener(
                'pushNotificationActionPerformed',
                (notification: PushNotificationActionPerformed) => {
                  console.log('########notif####### action performed' + JSON.stringify(notification));

                  // if message
                  if ('message' in notification.notification.data) {
                    this._zone.run(() => {
                      const message = new Message(JSON.parse(notification.notification.data.message));
                      this.router.navigateByUrl(`/dashboard/discussion/current/${message.sender.id}`);
                      message.thread = new Thread({
                        id: message.sender.id,
                        name: message.sender.first_name,
                        image: message.sender.image,
                      });
                      this.messagesService.addMessage(message);
                    });
                  }

                  // if new match
                  if ('user' in notification.notification.data) {
                    this._zone.run(() => {
                      const user = new User(JSON.parse(notification.notification.data.user));
                      this.router.navigateByUrl(`/dashboard/profile/${user.profil_url}`);
                    });
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }

          subs = this.messagerieService.init().subscribe(
            (available) => {
              this.messagerieService.setStatus(available);
            });
        } else if (!logged && typeof subs.unsubscribe === 'function') {
          subs.unsubscribe();
        }
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        console.log('completed ========');
      });
  }
}

