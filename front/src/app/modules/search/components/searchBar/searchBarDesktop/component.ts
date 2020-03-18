import {
  Component,
  OnInit,
} from '@angular/core';

import { TagService } from '~/core/services/tag/tag';
import { SearchBarBaseComponent } from '~/modules/search/components/searchBar/search-bar.base.component';

import { SearchService } from '../../../services/search';

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
}
