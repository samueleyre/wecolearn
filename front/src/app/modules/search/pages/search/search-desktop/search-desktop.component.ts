import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchComponentBase } from '~/modules/search/pages/search/search.component.base';
import { SearchService } from '~/core/services/search/search.service';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  selector: 'app-search-desktop',
  templateUrl: './search-desktop.component.html',
  styleUrls: ['./search-desktop.component.scss'],
})
export class SearchDesktopComponent extends SearchComponentBase implements OnInit {
  constructor(
    private _router: Router,
    private _searchService: SearchService,
    private _profileService: ProfileService,
  ) {
    super(_router, _searchService, _profileService);
  }
}
