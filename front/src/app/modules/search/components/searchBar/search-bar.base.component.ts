import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { MatMenuTrigger } from '@angular/material/menu';

import { TagService } from '~/core/services/tag/tag';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

import { SearchService } from '../../../../core/services/search/search';

@Component({
  template: '',
})export class SearchBarBaseComponent implements OnInit {
  public globalMode;
  public useProfileTagsMode;
  constructor(
        private tagService: TagService,
        private searchService: SearchService,
    ) {
    this.tagService = tagService;
  }

  get loading(): boolean {
    return this.searchService.loading;
  }

  get searchBarHasValue(): boolean {
    return !!this.searchInputControl.value;
  }

  public searchInputControl = new FormControl();
  public autocompleteDisabled = false;
  public foundAutocompleteTags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  @Output() searchInputChange = new EventEmitter();
  @ViewChild('searchBar', { static: false }) searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  public setUseProfileMode(bool) {
    this.searchService.setUseProfileTagsMode(bool);
  }

  public setGlobalMode(val) {
    this.searchService.setGlobalMode(val);
  }


  ngOnInit() {
    this.globalMode = this.searchService.globalMode;
    this.useProfileTagsMode = this.searchService.useProfileTagsMode;

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

    this.searchInputControl.valueChanges.pipe(
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this.tagService.findTags(value)),
    ).subscribe((tags) => {
      this.foundAutocompleteTags$.next(tags);
    });
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
      } else if (this.searchInputControl.value) {
        filters['tag'] = this.searchInputControl.value;
      }
    }
    this.searchInputChange.next(this.searchInputControl.value);
    this.searchService.setSearchInput('tag' in filters ? filters['tag'] : null);
    this.searchService.search(filters).subscribe();
    this.hideAutocomplete();
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

  focusInput() {
    setTimeout(() => {
      this.searchBarField.nativeElement.focus();
    });
  }

  onInputBlur() {
    this.foundAutocompleteTags$.next([]);
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }

  displayAutocomplete(tag: Tag): string {
    return tag ? tag.name : '';
  }
}
