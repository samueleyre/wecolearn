import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TagService } from '~/core/services/tag/tag.service';
import { Tag } from '~/core/entities/tag/entity';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
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

  public foundAutocompleteTagsObservable: Observable<Tag[]>;
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

    this.foundAutocompleteTagsObservable = this.inputChangeByUser$.asObservable().pipe(
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(300),
      filter(val => val !== '' && val !== null && val !== undefined && typeof val === 'string'),
      switchMap(value => this._tagService.findTags(value, this.tagType)),
      map(tags => tags.filter((tag => this.tagIdExceptions.indexOf(tag.id) === -1))),
    );
    this.foundAutocompleteTagsObservable.subscribe((tags) => {
      this.foundAutocompleteTags$.next(tags);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => { // prevent Expression changed error
      this.searchBar.nativeElement.focus();
    });
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
    this._router.navigate([this.returnLink]);
  }
}
