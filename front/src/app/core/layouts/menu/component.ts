import { Component, Injectable, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '~/core/entities/user/entity';
import { MenuService } from '~/core/services/layout/menu';
import { AuthenticationService } from '~/core/services/auth/auth';
import { Threads } from '~/modules/chat/services/threads';


@Component({
  selector: 'dash-menu',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class MenuComponent implements OnInit {
  me: User;
  public countNotRead$: Observable<number>;


  constructor(
      private authService: AuthenticationService, private menuService: MenuService, private _threadsService: Threads,
  ) {}

  ngOnInit() {
    this.me = this.authService.user;
    this.countNotRead$ = this._threadsService.orderedThreads
      .pipe(map(threads => threads.reduce((count, thread) => (count + thread.countNotRead), 0)));
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
