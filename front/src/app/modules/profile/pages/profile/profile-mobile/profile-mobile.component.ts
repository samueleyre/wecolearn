import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { UserService } from '~/core/services/user/user.service';
import { WcRouterService } from '~/core/services/wc-router.service';
import { ProfileComponentBase } from '~/modules/profile/pages/profile/profile.component.base';

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.scss'],
})
export class ProfileMobileComponent extends ProfileComponentBase implements OnInit {
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    super(_userService, _route, _router);
  }

}
