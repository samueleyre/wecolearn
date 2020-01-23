import { Component, Injectable, OnInit, Input } from '@angular/core';

import { User } from '~/core/entities/user/entity';

import { MenuService } from '~/core/services/layout/menu';
import { AuthenticationService } from '~/core/services/auth/auth';


@Component({
  selector: 'dash-menu',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class MenuComponent implements OnInit {
  me: User;
  activated: boolean;


  constructor(
      private authService: AuthenticationService, private menuService: MenuService,
  ) {
//
  }

  ngOnInit() {
    this.me = this.authService.user;

    // update menu display ( not used anymore )
    this.menuService.get().subscribe((on) => {
      this.activated = on;
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
