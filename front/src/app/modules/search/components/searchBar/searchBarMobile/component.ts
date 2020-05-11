import {
  Component,
  OnInit,
} from '@angular/core';

import { TagService } from '~/core/services/tag/tag';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';

import { SearchService } from '../../../../../core/services/search/search';


@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarMobileComponent extends SearchBarBaseComponent implements OnInit {
  constructor(
        private _tagService: TagService,
        private _searchService: SearchService,
        private _footerMobileService: FooterMobileService,
    ) {
    super(_tagService, _searchService);
  }

  onFocus() {
    this._footerMobileService.searchFocusState.next(true);
  }

  onBlur() {
    this._footerMobileService.searchFocusState.next(false);
    super.onInputBlur();
  }
}
