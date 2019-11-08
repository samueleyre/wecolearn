import { Component, Injectable, OnInit, Input } from '@angular/core';

import { User } from '~/core/entities/user/entity';

import { ClientService } from '~/core/services/client';
import { MenuService } from '~/core/services/layout/menu';


@Component({
  selector: 'dash-menu',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class MenuComponent implements OnInit {
  @Input() user: User;
  activated: boolean;


  constructor(
      private clientService: ClientService, private menuService: MenuService,
  ) {
//
  }

  ngOnInit() {
    this.clientService.get().subscribe((resp) => {
      this.user = resp;
    });

    this.menuService.get().subscribe((on) => {
      this.activated = on;
    });
  }
}
