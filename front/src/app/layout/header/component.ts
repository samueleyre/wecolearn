import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Logged } from '~/shared/services/logged';
import { AuthenticationService } from '~/shared/services/auth/auth';
import { ClientService } from '~/shared/services/client';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { Thread } from '~/shared/entities/thread/entity';
import { User } from '~/shared/entities/user/entity';
import { DomainService } from '~/shared/services/domain';
import { MenuService } from '~/shared/services/layout/menu';
import { UrlService } from '~/shared/services/url';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'dash-header',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class HeaderComponent implements OnInit {
  private location: Location;
  private logoPath: string;
  private imagePath: string;
  private webPath: string;
  private baseUrl: string;
  public connected = false;
  public unreadMessagesCount: number;
  public notifications: Thread[];
  public currentClient: User = new User();
  private collapseClass = 'collapse';
  private subDomain: string = null;


  constructor(private http: HttpClient,
              private router: Router,
              location: Location,
              @Inject(APP_BASE_HREF) r: string,
              public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              private authenticationService: AuthenticationService,
              private domainService: DomainService,
  ) {
    this.location = location;
    this.baseUrl = r;
  }

  ngOnInit() {
    this.webPath = UrlService.updateUrl('/');
    this.imagePath = this.webPath + 'img/';
    this.subDomain = this.domainService.getSubDomain();
    this.logoPath = `${this.webPath}logo/${this.subDomain}.png`;

    Logged.get().subscribe((logged: boolean) => {
      this.connected = logged;
      this.clientService.get().subscribe((client: User) => {
        this.currentClient = client;
        if (logged) {
          this.loadMessages();
        }
      });
    });

    if (!localStorage.getItem('cookieseen')) {
      // todo: fix cookie
      // MessageService.cookie();
    }
  }

  loadMessages() {
    this.messagesService.init();

    // if (!environment.production) {
    //   this.unreadMessagesCount = 1;
    //   this.notifications = [
    //     new Thread({
    //       name: 'bla',
    //       lastMessage: new Message({message: 'blablabla'})
    //     })
    //   ];
    // } else {

    this.threadsService.orderedThreads.subscribe((currentThreads: Thread[]) => {
      this.notifications = [];

      _.map(currentThreads, (currentThread: Thread) => {
        const messageIsFromUser: boolean = currentThread.lastMessage.sender &&
            this.currentClient &&
            (currentThread.lastMessage.sender.id === this.currentClient.id);

        if (!currentThread.lastMessage.is_read && !messageIsFromUser && currentThread.lastMessage.sender) {
          this.notifications.push(currentThread);
        }
      });
      // todo: only if not on message page !
      this.unreadMessagesCount = (this.notifications.length > 0) ? this.notifications.length : null;
    });

    // }
  }

  preventDefault(e: any) {
    e.preventDefault();
  }

  /**
   * Open discussion && update ddb
   */
  activateNotification(thread: Thread): void {
    this.threadsService.setCurrentThread(thread);
    this.messagesService.pushUpdatedMessages().subscribe(() => {
      this.router.navigate([NAV.discussion]);
    });
  }

  collapse() {
    (this.collapseClass === 'collapse') ? this.collapseClass = null : this.collapseClass = 'collapse';
  }

  logOut() {
    this.authenticationService.logout(true);
    this.messagesService.stopNewMessageLoop();
  }


  toggle() {
    MenuService.displayToggle();
  }
}
