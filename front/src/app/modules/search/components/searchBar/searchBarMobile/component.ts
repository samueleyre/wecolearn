import {
  Component, EventEmitter,
  OnInit, Output,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TagService } from '~/core/services/tag/tag';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { SearchService } from '~/core/services/search/search';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';
import { Tag } from '~/core/entities/tag/entity';


@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarMobileComponent extends SearchBarBaseComponent implements OnInit {
  @Output() isActifEmitter = new EventEmitter<boolean>();

  constructor(
        private _tagService: TagService,
        private _searchService: SearchService,
        private _footerMobileService: FooterMobileService,
    ) {
    super(_tagService, _searchService);
    this.searchBarActive.asObservable().subscribe((val) => {
      this._footerMobileService.inputFocusState.next(val);
      this.isActifEmitter.emit(val);
    });
  }

  activateSearchBar(): void {
    this.searchBarActive.next(true);
  }

  search(tag?: Tag) {
    this.searchBarActive.next(false);
    super.search(tag);
    super.focusOut();
  }

  resetSearchBar(event):void {
    if (this.isActive) {
      super.resetSearchBar(event);
    } else {
      event.stopPropagation();
      this._searchService.setSearchInput(null);
      this.search();
      super.resetSearchBar(event);
    }
  }

  get isActive(): boolean {
    return this.searchBarActive.getValue();
  }

  deactivateSearchBar() {
    // reset search
    this.searchInputControl.setValue(this._searchService.searchInputValue ? this._searchService.searchInputValue.name : null);
    this.searchBarActive.next(false);
  }
}
