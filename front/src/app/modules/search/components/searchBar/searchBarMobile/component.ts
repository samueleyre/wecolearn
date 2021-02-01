import {
  Component, EventEmitter,
  OnInit, Output,
} from '@angular/core';
import { map } from 'rxjs/operators';

import { TagService } from '~/core/services/tag/tag.service';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { SearchService } from '~/core/services/search/search.service';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';
import { Tag } from '~/core/entities/tag/entity';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { TagDomainsService } from '~/core/services/tag/tag-domains.service';


@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarMobileComponent extends SearchBarBaseComponent implements OnInit {
  @Output() isActifEmitter = new EventEmitter<boolean>();

  constructor(
        private _tagService: TagService,
        private _tagDomainsService: TagDomainsService,
        private _searchService: SearchService,
        private _footerMobileService: FooterMobileService,
    ) {
    super(_tagService, _searchService);
    this.searchBarActive.asObservable().subscribe((val) => {
      this._footerMobileService.inputFocusState.next(val);
      this.isActifEmitter.emit(val);
    });
  }

  ngOnInit() {
    this.initTagDomains();
    super.ngOnInit();
    this.foundAutocompleteTagsObservable.subscribe((tags) => {
      if (this.searchBarActive.getValue()) {
        this.foundAutocompleteTags$.next(tags);
      }
    });
  }

  private initTagDomains(): void {
    this._tagDomainsService.getPopularDomains().subscribe();
  }

  /**
   * 6 first popular domains
   */
  get tagDomains$() {
    return this._tagDomainsService.entities$.pipe(map(val => val.slice(0, 6)));
  }

  activateSearchBar(): void {
    this.searchBarActive.next(true);
  }

  search(tag?: Tag) {
    this.searchBarActive.next(false);
    super.search(tag);
    super.focusOut();
  }

  searchByTagDomain(tagDomain: TagDomain) {
    this.searchBarActive.next(false);
    super.searchByTagDomain(tagDomain);
    super.focusOut();
  }

  resetSearchBar(event):void {
    if (this.isActive) {
      super.resetSearchBar(event);
    } else {
      event.stopPropagation();
      this._searchService.setSearchInputAsTag(null);
      this.search();
      super.resetSearchBar(event);
    }
  }

  get isActive(): boolean {
    return this.searchBarActive.getValue();
  }

  get inputIsEmpty(): boolean {
    return this.searchInputControl.value === null || this.searchInputControl.value === '';
  }

  deactivateSearchBar() {
    // reset search
    this.searchInputControl.setValue(this._searchService.searchInputValue ? this._searchService.searchInputValue.name : null);
    this.searchBarActive.next(false);
  }
}
