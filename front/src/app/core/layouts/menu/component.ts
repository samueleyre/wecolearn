import { Component, Injectable, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '~/core/entities/user/entity';
import { MenuService } from '~/core/services/layout/menu';
import { ThreadsService } from '~/core/services/chat/threads.service';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  selector: 'dash-menu',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class MenuComponent implements OnInit {
  me: User;
  public countNotRead$: Observable<number>;


  constructor(
      private _profileService: ProfileService, private menuService: MenuService, private _threadsService: ThreadsService,
  ) {}

  ngOnInit() {
    this.me = this._profileService.profile;
    this.countNotRead$ = this._threadsService.orderedThreads
      .pipe(map(threads => threads.reduce((count, thread) => (count + thread.countNotRead), 0)));
  }

  get isAdmin(): boolean {
    return this._profileService.isAdmin;
  }
}
