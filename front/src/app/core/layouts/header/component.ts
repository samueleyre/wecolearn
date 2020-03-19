import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Logged } from '~/core/services/auth/logged';
import { AuthenticationService } from '~/core/services/auth/auth';
import { ClientService } from '~/core/services/user/client';
import { MessagesService } from '~/modules/chat/services/messages';
import { Thread } from '~/core/entities/thread/entity';
import { User } from '~/core/entities/user/entity';
import { DomainService } from '~/core/services/domain/domain';
import { MenuService } from '~/core/services/layout/menu';
import { WcRouterService } from '~/core/services/wc-router.service';

@Component({
  selector: 'dash-header',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class HeaderComponent implements OnInit {
  private location: Location;
  private baseUrl: string;
  public connected = false;
  public notifications: Thread[];
  public currentClient: User = new User();

  constructor(private http: HttpClient,
              private router: Router,
              location: Location,
              @Inject(APP_BASE_HREF) r: string,
              public messagesService: MessagesService,
              public clientService: ClientService,
              private authenticationService: AuthenticationService,
              private domainService: DomainService,
              private _wcRouter: WcRouterService,
  ) {
    this.location = location;
    this.baseUrl = r;
  }

  ngOnInit() {
    Logged.get().subscribe((logged: boolean) => {
      this.connected = logged;
      this.clientService.get().subscribe((client: User) => {
        this.currentClient = client;
        if (logged) {
          this.loadMessages();
        }
      });
    });
  }

  loadMessages() {
    this.messagesService.init();
  }

  preventDefault(e: any) {
    e.preventDefault();
  }

  logOut() {
    this.authenticationService.logout(true);
  }

  toggle() {
    MenuService.displayToggle();
  }
}
