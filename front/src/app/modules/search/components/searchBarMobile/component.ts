import {
  Component,
  OnInit,
  Injectable, Output, EventEmitter, ElementRef, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { MatAutocompleteTrigger } from '@angular/material';

import { TagService } from '~/core/services/tag';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';

import { SearchService } from '../../services/search';


@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SearchBarMobileComponent implements OnInit {
  public searchInputControl = new FormControl();
  autocompleteDisabled = false;
  observableSource: Observable<string[]>;
  @Output() searchInputChange = new EventEmitter();
  @ViewChild('searchBar') searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(
        protected tagService: TagService,
        private _searchService: SearchService,
        private _footerMobileService: FooterMobileService,
    ) {
    this.tagService = tagService;
  }


  ngOnInit() {
    this._searchService.getSearchInput().subscribe((tag: string) => {
      this.searchInputControl.setValue(tag);
    });

    this.observableSource = this.searchInputControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.tagService.findTags(value)),
    );
  }


  get loading(): boolean {
    return this._searchService.loading;
  }

  search() {
    const filters = {};
    if (this.searchInputControl) {
      filters['tag'] = this.searchInputControl.value;
    }
    this.searchInputChange.next(this.searchInputControl.value);
    this._searchService.search(filters).subscribe();
    this.focusOut();
    this.hideAutocomplete();
  }

  focusOut() {
    this.searchBarField.nativeElement.blur();
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }

  onFocus() {
    this._footerMobileService.searchFocusState.next(true);
  }

  onBlur() {
    this._footerMobileService.searchFocusState.next(false);
  }
}
