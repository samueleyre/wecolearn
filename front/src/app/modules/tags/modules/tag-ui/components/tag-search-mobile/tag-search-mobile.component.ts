import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TagService } from '~/core/services/tag/tag';
import { TagDomainsService } from '~/core/services/tag/tag-domains.service';
import { SearchService } from '~/core/services/search/search';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { Tag } from '~/core/entities/tag/entity';
import {TagTypeEnum} from '~/core/enums/tag/tag-type.enum';

@Component({
  selector: 'app-tag-search-mobile',
  templateUrl: './tag-search-mobile.component.html',
  styleUrls: ['./tag-search-mobile.component.scss'],
})
export class TagSearchMobileComponent implements OnInit {
  @Input() returnLink: string;
  @Input() tagType: TagTypeEnum;
  @Output() tag = new EventEmitter<Tag | null>();

  @ViewChild('searchBar', { static: false }) searchBar:ElementRef;

  public searchBarActive = new BehaviorSubject(false);
  public foundAutocompleteTagsObservable: Observable<Tag[]>;
  public searchInputControl = new FormControl();
  public foundAutocompleteTags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public inputChangeByUser$ = new Subject<string>();

  constructor(
    private _tagService: TagService,
    private _tagDomainsService: TagDomainsService,
    private _searchService: SearchService,
    private _footerMobileService: FooterMobileService,
    private _router: Router,
  ) {
    this.searchBarActive.asObservable().subscribe((val) => {
      this._footerMobileService.inputFocusState.next(val);
    });
  }

  ngOnInit() {
    this.initTagDomains();

    this.foundAutocompleteTagsObservable = this.inputChangeByUser$.asObservable().pipe(
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this._tagService.findTags(value, this.tagType)),
    );
    this.foundAutocompleteTagsObservable.subscribe((tags) => {
      if (this.searchBarActive.getValue()) {
        this.foundAutocompleteTags$.next(tags);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => { // prevent Expression changed error
      this.searchBar.nativeElement.focus();
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

  get loading(): boolean {
    return this._searchService.loading;
  }

  get inputIsEmpty(): boolean {
    return this.searchInputControl.value === null || this.searchInputControl.value === '';
  }

  inputChangeByUser($event) {
    this.inputChangeByUser$.next($event.target.value);
  }

  activateSearchBar(): void {
    this.searchBarActive.next(true);
  }

  select(tag?: Tag): void {
    this.tag.emit(tag);
  }

  resetSearchBar(event): void {
    this.searchInputControl.setValue(null);
    this.foundAutocompleteTags$.next([]);
  }

  return() {
    this._router.navigate([this.returnLink]);
  }
}
