import {
  Component,
  OnInit,
} from '@angular/core';

import { TagService } from '~/core/services/tag/tag';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

import { SearchService } from '~/core/services/search/search';

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

  search(): void {
    let tag = null;
    if (this.searchInputControl) {
      if (typeof this.searchInputControl.value === 'string') {
        tag = new Tag({
          id: null,
          name: this.searchInputControl.value,
          type: TagTypeEnum.LEARN,
        });
      } else if (this.searchInputControl.value) {
        tag = this.searchInputControl.value;
      }
    }
    this.searchInputChange.next(this.searchInputControl.value);
    super.search(tag);
    this.hideAutocomplete();
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }
}
