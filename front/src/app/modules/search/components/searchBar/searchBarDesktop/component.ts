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

@Component({
  selector: 'app-searchbar',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarComponent extends SearchBarBaseComponent implements OnInit {
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

  public setCommunity(val: MatSelectChange) {
    super.setCommunity(val.value);
    this._searchService.searchAgainWithSamefilters();
  }
}
