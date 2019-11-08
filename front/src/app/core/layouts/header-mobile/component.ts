import { Component, Injectable, Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF, Location } from '@angular/common';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import * as _ from 'lodash';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { filter, pairwise, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Logged } from '~/core/services/logged';
import { AuthenticationService } from '~/core/services/auth/auth';
import { ClientService } from '~/core/services/client';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { Thread } from '~/core/entities/thread/entity';
import { User } from '~/core/entities/user/entity';
import { DomainService } from '~/core/services/domain';
import { MenuService } from '~/core/services/layout/menu';
import { UrlService } from '~/core/services/url';
import { NAV } from '~/config/navigation/nav';
import { RETURN_URLS } from '~/config/navigation/returnUrls';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';

@Component({
  selector: 'dash-header-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class HeaderMobileComponent implements OnInit, OnDestroy {
  private location: Location;
  private logoPath: string;
  private imagePath: string;
  private webPath: string;
  private baseUrl: string;
  private alive = true;
  public connected = false;
  public unreadMessagesCount: number;
  public notifications: Thread[];
  public currentClient: User = new User();
  private collapseClass = 'collapse';
  private subDomain: string = null;
  public showReturn = false;
  showDiscussionUser = false;
  public returnLink: string;
  discussingUser$:Observable<User>;


  constructor(private http: HttpClient,
              private router: Router,
              location: Location,
              @Inject(APP_BASE_HREF) r: string,
              public messagesService: MessagesService,
              public threadsService: Threads,
              public clientService: ClientService,
              private authenticationService: AuthenticationService,
              private domainService: DomainService,
              private menuMobileService: MenuMobileService,
  ) {
    this.location = location;
    this.baseUrl = r;
  }

  ngOnInit() {
    this.initReturn();
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
    this.discussingUser$ = MenuMobileService.discussingUser.asObservable();
  }


  private initReturn() {
    // onload
    if (this.router.url) {
      this.showReturn = this.menuMobileService.showReturn(this.router.url);
      this.returnLink = MenuMobileService.getReturnLink(this.router.url);
      this.showDiscussionUser = MenuMobileService.showDiscussionUser(this.router.url);
    } else {
      console.log('Current route not found');
    }

    // on redirect
    this.router.events
      .pipe(takeWhile(() => this.alive))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.showReturn = this.menuMobileService.showReturn(e.urlAfterRedirects);
          this.showDiscussionUser = MenuMobileService.showDiscussionUser(e.urlAfterRedirects);
          this.returnLink = MenuMobileService.getReturnLink();
        }
      });
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
      this.router.navigate([NAV.search]);
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

  ngOnDestroy(): void {
    this.alive = false;
  }
}
