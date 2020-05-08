import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { MatMenuTrigger } from '@angular/material/menu';

import { TagService } from '~/core/services/tag/tag';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

import { SearchService } from '../../../../core/services/search/search';

@Component({
  template: '',
})export class SearchBarBaseComponent implements OnInit {
  public searchInputControl = new FormControl();
  autocompleteDisabled = false;
  observableSource: Observable<Tag[]>;
  @Output() searchInputChange = new EventEmitter();
  @ViewChild('searchBar', { static: false }) searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  constructor(
        private tagService: TagService,
        private searchService: SearchService,
    ) {
    this.tagService = tagService;
  }

  ngOnInit() {
    this.searchService.getSearchInputObs().subscribe((tag: Tag) => {
      this.searchInputControl.setValue(tag);
      if (typeof this.searchInputControl.value === 'string') {
        this.searchInputChange.next(
          new Tag({
            id: null,
            name: this.searchInputControl.value,
            type: TagTypeEnum.LEARN,
          }),
        );
      } else {
        this.searchInputChange.next(this.searchInputControl.value);
      }
    });

    this.observableSource = this.searchInputControl.valueChanges.pipe(
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this.tagService.findTags(value)),
    );
  }

  get loading(): boolean {
    return this.searchService.loading;
  }

  search() {
    const filters = {};
    if (this.searchInputControl) {
      if (typeof this.searchInputControl.value === 'string') {
        filters['tag'] = new Tag({
          id: null,
          name: this.searchInputControl.value,
          type: TagTypeEnum.LEARN,
        });
      } else {
        filters['tag'] = this.searchInputControl.value;
      }
    }
    this.searchInputChange.next(this.searchInputControl.value);
    this.searchService.setSearchInput('tag' in filters ? filters['tag'] : null);
    this.searchService.search(filters).subscribe();
    this.focusOut();
    this.hideAutocomplete();
  }

  get searchBarHasValue(): boolean {
    return !!this.searchInputControl.value;
  }

  resetSearchBar(): void {
    this.searchInputControl.setValue(null);
  }

  onFilterClick(event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  focusOut() {
    this.searchBarField.nativeElement.blur();
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }

  displayAutocomplete(tag: Tag): string {
    return tag ? tag.name : '';
  }
}
