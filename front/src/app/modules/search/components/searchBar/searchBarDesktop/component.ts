import {
  Component,
  OnInit,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material';

import { TagService } from '~/core/services/tag/tag.service';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';
import { SearchService } from '~/core/services/search/search.service';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { Community } from '~/core/entities/domain/community';

@Component({
  selector: 'app-searchbar',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarComponent extends SearchBarBaseComponent implements OnInit {
  selectedCommunity: Community;

  constructor(
        private _tagService: TagService,
        private _searchService: SearchService,
    ) {
    super(_tagService, _searchService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.foundAutocompleteTagsObservable.subscribe((tags) => {
      this.foundAutocompleteTags$.next(tags);
    });
    this.selectedCommunity = this._searchService.community;
  }

  get communities() {
    return this._searchService.communities;
  }

  get showCommunities() {
    return this.communities.filter(domain => !domain.is_main).length > 0;
  }

  selectOption($event: MatAutocompleteSelectedEvent): void {
    super.search($event.option.value);
    this.hideAutocomplete();
  }

  searchWithString(): void {
    let tag = null;
    if (this.searchInputControl.value) {
      tag = new Tag({
        id: null,
        name: this.searchInputControl.value,
        type: TagTypeEnum.LEARN,
      });
    }
    this.search(tag);
    this.hideAutocomplete();
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }

  public setGlobalMode(val) {
    super.setGlobalMode(val);
    this._searchService.searchAgainWithSamefilters();
  }

  public setCommunity(val) {
    this._searchService.setCommunity(val);
    this._searchService.searchAgainWithSamefilters();
  }
}
