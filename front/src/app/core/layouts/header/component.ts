import { Component, OnInit } from '@angular/core';

import { Logged } from '~/core/services/auth/logged';
import { AuthenticationService } from '~/core/services/auth/auth';
import { ClientService } from '~/core/services/user/client';
import { User } from '~/core/entities/user/entity';
import { NAV } from '~/config/navigation/nav';

@Component({
  selector: 'dash-header',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class HeaderComponent implements OnInit {
  public currentUser: User = new User();
  public navLinks = NAV;

  constructor(
    public clientService: ClientService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    Logged.get().subscribe((logged: boolean) => {
      this.clientService.get().subscribe((client: User) => {
        this.currentUser = client;
      });
    });
  }

  logOut() {
    this.authenticationService.logout(true);
  }
}
