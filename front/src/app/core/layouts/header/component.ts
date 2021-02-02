import { Component, OnInit } from '@angular/core';

import { Logged } from '~/core/services/auth/logged';
import { AuthenticationService } from '~/core/services/auth/auth';
import { User } from '~/core/entities/user/entity';
import { NAV } from '~/config/navigation/nav';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  selector: 'dash-header',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class HeaderComponent implements OnInit {
  public currentUser: User = new User();
  public navLinks = NAV;

  constructor(
    private _profileService: ProfileService,
    private _authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    Logged.get().subscribe((logged: boolean) => {
      this._profileService.entity$.subscribe((client: User) => {
        this.currentUser = client;
      });
    });
  }

  logOut() {
    this._authenticationService.logout(true);
  }
}
