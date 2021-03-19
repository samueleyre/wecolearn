import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, delay, filter, map, share, switchMap, tap, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TagService } from '~/core/services/tag/tag.service';
import { Tag } from '~/core/entities/tag/entity';
import { tagTypeEN, TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { PopularTagDomainsAsTagsService } from '~/core/services/tag/popular-tag-domains-as-tags.service';
import { DestroyObservable } from '~/core/components/destroy-observable';

@Component({
  selector: 'app-tag-search-mobile',
  templateUrl: './tag-search-mobile.component.html',
  styleUrls: ['./tag-search-mobile.component.scss'],
})
export class TagSearchMobileComponent extends DestroyObservable implements OnInit {
  @Input() returnLink: string;
  @Input() tagType: TagTypeEnum;
  @Input() tagIdExceptions: number[];
  @Output() tag = new EventEmitter<Tag | null>();

  @ViewChild('searchBar', { static: false }) searchBar:ElementRef;

  public addYourOwnTag$ = new BehaviorSubject<string>(null);
  public searchInputControl = new FormControl();
  public foundAutocompleteTags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public inputChangeByUser$ = new Subject<string>();

  constructor(
    private _tagService: TagService,
    private _popularTagDomainAsTags: PopularTagDomainsAsTagsService,
    private _router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.initTagDomains();

    const inputChangeByUserAsObservable = this.inputChangeByUser$.asObservable();
    const foundAutocompleteTagsNotFiltered$ = inputChangeByUserAsObservable.pipe(
      tap(() => this.addYourOwnTag$.next(null)),
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this._tagService.findTags(value, this.tagType)),
      map(tags => tags.filter(filterExceptionsById)),
      share(),
    );

    const filterExceptionsById = tag => this.tagIdExceptions.indexOf(tag.id) === -1;

    foundAutocompleteTagsNotFiltered$.pipe(
    ).subscribe((tags) => {
      this.foundAutocompleteTags$.next(tags);
    });

    foundAutocompleteTagsNotFiltered$.pipe(
      delay(2000),
      map(tags => !this.inputIsEmpty
            && this.inputValue.length > 3
            && tags.length < 1,
      ),
    ).subscribe((noResult) => {
      if (noResult) {
        this.addYourOwnTag$.next(this.inputValue);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => { // prevent Expression changed error
      this.searchBar.nativeElement.focus();
    });
  }

  public get addYourOwnTag() {
    return this.addYourOwnTag$.value;
  }

  private initTagDomains(): void {
    this._popularTagDomainAsTags.getPopularDomainsAsTags(15).subscribe();
  }

  get popularTagDomainsAsTags$(): Observable<Tag[]> {
    // tslint:disable-next-line:no-magic-numbers
    return this._popularTagDomainAsTags.entities$.pipe(map(tags => tags.filter((tag => this.tagIdExceptions.indexOf(tag.id) === -1))));
  }

  get inputIsEmpty(): boolean {
    return this.searchInputControl.value === null || this.searchInputControl.value === '';
  }

  get inputValue(): string {
    return this.searchInputControl.value;
  }

  // get showAddYourOwnTagOption() {
  //   return !this.inputIsEmpty && this.inputValue.length > 3 && (this.foundAutocompleteTags$.value.length < 1);
  // }

  addTagByName(tagName) {
    this.select(new Tag({ name: tagName, type: this.tagType }));
  }

  get showTagDomains(): boolean {
    return this.inputIsEmpty && this.tagType === TagTypeEnum.LEARN;
  }

  inputChangeByUser($event) {
    this.inputChangeByUser$.next($event.target.value);
  }

  select(tag?: Tag): void {
    this.tag.emit(tag);
  }

  resetSearchBar(event): void {
    this.searchInputControl.setValue(null);
    this.foundAutocompleteTags$.next([]);
  }

  return() {
    this._router.navigate([this.returnLink.split('#')[0]], { fragment: tagTypeEN[this.tagType] });
  }
}
