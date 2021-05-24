import { Component, NgZone, ViewEncapsulation } from '@angular/core';
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
import { MessagerieService } from '~/core/services/messagerie/messagerie.service';
import { NAV } from '~/config/navigation/nav';
import { ThreadsService } from '~/core/services/chat/threads.service';
import { SeoService } from '~/core/services/seo.service';
import { User } from '~/core/entities/user/entity';

import { CommunityService } from './core/services/community/community.service';
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
    private _router: Router,
    private _domainService: CommunityService,
    private _deviceService: DeviceDetectorService,
    private _iconService: IconService,
    private _seoService: SeoService,
    private _zone: NgZone,
    private _threadService: ThreadsService,
    private _messagesService: MessagesService,
    private _messagerieService: MessagerieService,
    private _deeplinks: Deeplinks,
    private _platform: Platform,
  ) {
    // set subdomain
    _router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        _seoService.updateSeoTitleAndTags(event.urlAfterRedirects);
      });

    this.initMessagerieService();
    _iconService.init();
  }

  private initMessagerieService() {
    Logged.get().pipe(distinctUntilChanged()).subscribe(
      (logged) => {
        let subs: any = { unsubscribe: null };

        if (this.isAndroid) {
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
                this._router.navigateByUrl(path);
              });
          });
        }

        if (logged) {
          // get all messages every time logged or app is reloaded
          this._messagesService.initMessages();

          // subscribe to mercure updates
          if (!this.isAndroid) {
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
                  this._messagesService.addMessage(message);
                });
              }
              if ('is_read' in data) {
                this._messagesService.updateIsRead.next(new Message(data.is_read));
              }
            };
          }

          if (this.isAndroid) {
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
                      this._messagesService.addMessage(message);
                    });
                  }

                  // if is_read
                  if ('is_read' in notification.data) {
                    this._zone.run(() => {
                      this._messagesService.updateIsRead.next(new Message(JSON.parse(notification.data.message)));
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
                      this._router.navigateByUrl(`/dashboard/discussion/current/${message.sender.id}`);
                      message.thread = new Thread({
                        id: message.sender.id,
                        name: message.sender.first_name,
                        image: message.sender.image,
                      });
                      this._messagesService.addMessage(message);
                    });
                  }

                  // if new match
                  if ('user' in notification.notification.data) {
                    this._zone.run(() => {
                      const user = new User(JSON.parse(notification.notification.data.user));
                      this._router.navigateByUrl(`${NAV.profilePublic}/${user.profil_url}`);
                    });
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }

          subs = this._messagerieService.init().subscribe(
            (available) => {
              this._messagerieService.setStatus(available);
            });
        } else if (!logged && typeof subs.unsubscribe === 'function') {
          subs.unsubscribe();
        }
      },
      (error) => {
        console.log('error', error);
      });
  }

  get isMobile(): boolean {
    return this._deviceService.isMobile();
  }

  get isAndroid(): boolean {
    return environment.android;
  }
}

