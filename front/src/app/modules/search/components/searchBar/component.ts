import {
  Component,
  OnInit,
  Injectable, Output, EventEmitter, ViewChild, ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';

import { TagService } from '~/core/services/tag';
import { Tag } from '~/core/entities/tag/entity';

import { SearchService } from '../../services/search';


@Component({
  selector: 'app-searchbar',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchBarComponent implements OnInit {
  public searchInputControl = new FormControl();
  autocompleteDisabled = false;
  observableSource: Observable<Tag[]>;
  @Output() searchInputChange = new EventEmitter();
  @ViewChild('searchBar', { static: false }) searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;

  constructor(
        protected tagService: TagService,
        private _searchService: SearchService,
    ) {
    this.tagService = tagService;
  }


  ngOnInit() {
    this._searchService.getSearchInput().subscribe((tag: string) => {
      this.searchInputControl.setValue(tag);
    });

    this.observableSource = this.searchInputControl.valueChanges.pipe(
      // tslint:disable-next-line:no-magic-numbers
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
}
