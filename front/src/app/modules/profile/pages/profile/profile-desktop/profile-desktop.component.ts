import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileComponentBase } from '~/modules/profile/pages/profile/profile.component.base';
import { UserService } from '~/core/services/user/user.service';
import { WcRouterService } from '~/core/services/wc-router.service';
import {NAV} from '~/config/navigation/nav';

@Component({
  selector: 'app-profile-desktop',
  templateUrl: './profile-desktop.component.html',
  styleUrls: ['./profile-desktop.component.scss'],
})
export class ProfileDesktopComponent extends ProfileComponentBase implements OnInit {
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _wcRouter: WcRouterService,
  ) {
    super(_userService, _route, _router);
  }

  get returnLink() {
    return this._wcRouter.getReturnLink(NAV.search);
  }
}
