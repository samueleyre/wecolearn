import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchComponentBase } from '~/modules/search/pages/search/search.component.base';
import { SearchService } from '~/core/services/search/search';

@Component({
  selector: 'app-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.scss'],
})
export class SearchMobileComponent extends SearchComponentBase implements OnInit {
  searchBarIsActive = false;

  constructor(
    private _router: Router,
    private _searchService: SearchService,
  ) {
    super(_router, _searchService);
  }

  onScroll(ev) {
    this.timeOutScroll();
    super.onScroll(ev);
  }
}
