import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, skipWhile, switchMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatAutocompleteTrigger, MatSelectChange } from '@angular/material';
import { MatMenuTrigger } from '@angular/material/menu';

import { TagService } from '~/core/services/tag/tag.service';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { CommunityEntity } from '~/core/entities/community/community.entity';
import { ProfileService } from '~/core/services/user/profile.service';

import { SearchService } from '../../../../core/services/search/search.service';

@Component({
  template: '',
})export class SearchBarBaseComponent extends DestroyObservable implements OnInit {
  public searchBarActive = new BehaviorSubject(false);
  public globalMode;
  public useProfileTagsMode;
  public foundAutocompleteTagsObservable: Observable<Tag[]>;
  public searchInputControl = new FormControl();
  public autocompleteDisabled = false;
  public foundAutocompleteTags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public inputChangeByUser$ = new Subject<string>();
  public selectedCommunity: CommunityEntity;

  constructor(
        private tagService: TagService,
        private searchService: SearchService,
  ) {
    super();
    this.tagService = tagService;
  }

  get loading(): boolean {
    return this.searchService.loading;
  }

  get searchBarHasValue(): boolean {
    return !!this.searchInputControl.value;
  }

  @ViewChild('searchBar', { static: false }) searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  public setUseProfileMode(bool) {
    this.searchService.setUseProfileTagsMode(bool);
  }

  public setGlobalMode(val) {
    this.searchService.setGlobalMode(val);
  }

  public setCommunity(val) {
    this.searchService.setCommunity(val);
  }

  ngOnInit() {
    this.globalMode = this.searchService.globalMode;
    this.useProfileTagsMode = this.searchService.useProfileTagsMode;
    this.selectedCommunity = this.searchService.community;

    this.searchService.getSearchInputObs().subscribe((val?: Tag | TagDomain) => {
      this.searchInputControl.setValue(val ? val.name : null);
    });

    this.foundAutocompleteTagsObservable = this.inputChangeByUser$.asObservable().pipe(
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this.tagService.findTags(value)),
    );
  }

  get communities() {
    return this.searchService.communities;
  }

  get showCommunities() {
    return this.communities.filter(domain => !domain.is_main).length > 0;
  }

  inputChangeByUser($event) {
    this.inputChangeByUser$.next($event.target.value);
  }

  search(tag?: Tag) {
    const filters = {};
    if (tag) {
      filters['tag'] = tag;
    }
    this.foundAutocompleteTags$.next([]);
    this.searchService.setSearchInputAsTag('tag' in filters ? filters['tag'] : null);
    this.searchService.search(filters).subscribe();
  }

  searchByTagDomain(tagDomain: TagDomain) {
    const filters = {
      useProfileTags: false, // don't search using profile tags
    };
    if (tagDomain) {
      filters['tagDomain'] = tagDomain;
    }
    this.foundAutocompleteTags$.next([]);
    this.searchService.setSearchInputAsTagDomain('tagDomain' in filters ? filters['tagDomain'] : null);
    this.searchService.search(filters).subscribe();
  }

  resetSearchBar(event): void {
    this.searchInputControl.setValue(null);
    this.foundAutocompleteTags$.next([]);
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
    if (!this.searchBarHasValue) {
      this.foundAutocompleteTags$.next([]);
    }
  }
}
