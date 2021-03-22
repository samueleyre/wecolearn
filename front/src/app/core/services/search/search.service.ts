import { finalize, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';
import { Tag } from '~/core/entities/tag/entity';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { Community } from '~/core/entities/domain/community';
import { ProfileService } from '~/core/services/user/profile.service';

import { SEARCH } from '../../../modules/search/config/main';

interface ApiResponseInterface {
  meta: any;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService extends APIService<User> {
  private currentlySearching = false;
  private searchInput: BehaviorSubject<Tag | TagDomain> = new BehaviorSubject(null);
  static max = SEARCH.default.max;
  static first = 0;
  public globalMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public community$: BehaviorSubject<Community|null> = new BehaviorSubject<Community|null>(null);
  public useProfileTagsMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  currentFoundMatchs$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  currentFoundAddress: any[] = [];
  currentSearch: {} = {};
  public endPoint = '/api/user/matchs';
  public searchMetaSubject: BehaviorSubject<{ [key in SearchMeta]: boolean }> = new BehaviorSubject(null);

  constructor(private _http: HttpClient, private _profileService: ProfileService) {
    super(_http);
    this.setCommunity(this.defaultCommunity);
  }

  get communities(): Community[] {
    return this._profileService.profile.domains;
    // todo: filter main domain & unshit main domain with hard image & name
  }

  get defaultCommunity() {
    // todo: make user select default community
    return this.communities.filter(domain => !domain.is_main)[0];
  }

  get searchType():string {
    if (SearchService.first > 0) {
      return 'scroll';
    }
    return 'default';
  }

  get searchMeta(): { [key in SearchMeta]: boolean } {
    return this.searchMetaSubject.value;
  }

  private resetSearch():void {
    SearchService.first = 0;
  }

  get searchInputValue(): Tag | TagDomain | null {
    return this.searchInput.value;
  }

  getSearchInputObs(): Observable<Tag | TagDomain> {
    return this.searchInput;
  }

  setSearchInputAsTag(tag: Tag): void {
    this.searchInput.next(new Tag(tag));
  }

  setSearchInputAsTagDomain(tagDomain: TagDomain): void {
    this.searchInput.next(new TagDomain(tagDomain));
  }

  searchList(filters: {} = {}): Observable<ApiResponseInterface> {
    return this._http.post(this.endPoint, filters)
      .pipe(
        tap((data: ApiResponseInterface) => {
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  search(filters: {} = {}): Observable<boolean> {
    if (!filters.hasOwnProperty('first')) {
      this.resetSearch();
    }
    filters['max'] = SEARCH.default.max;
    filters['global'] = this.globalMode;
    filters['domain'] = this.community;
    if (SearchService.first > 0) {
      // scroll search
      // keep same type of search
      filters[SearchMeta.useProfileTags] = this.searchMeta.useProfileTags;
      filters[SearchMeta.userLearnTags] = this.searchMeta.userLearnTags;
      filters[SearchMeta.userLearnTagDomains] = this.searchMeta.userLearnTagDomains;
      filters[SearchMeta.userKnowTags] = this.searchMeta.userKnowTags;
      filters[SearchMeta.userKnowTagDomains] = this.searchMeta.userKnowTagDomains;
    } else {
      filters[SearchMeta.useProfileTags] = SearchMeta.useProfileTags in filters ?
        filters[SearchMeta.useProfileTags] : this.useProfileTagsMode;
    }
    this._loading$.next(true);

    return this.searchList(filters).pipe(
      map((response: ApiResponseInterface) => {
        if (SearchService.first === 0) {
          // new search
          this.searchMetaSubject.next(response.meta);
          this.currentFoundMatchs$.next(response.data.map(val => val[0]));
        } else {
          // scroll search
          this.currentFoundMatchs$.next(
            _.uniqBy(
              [
                ...this.currentFoundMatchs$.getValue(),
                ...response.data.map(val => val[0]),
              ],
              'id'),
          );
        }
        this._loading$.next(false);
        this.currentlySearching = false;
        return true;
      }),
    );
  }

  searchAgainWithSamefilters(filters = {}) {
    let filledFilters = filters;
    const val = this.searchInputValue;
    if (this.searchInputValue) {
      filledFilters = {
        ...filters,
        tag: (val instanceof Tag) ? val : null,
        tagDomain: (val instanceof TagDomain) ? val : null,
      };
    }
    this.search(filledFilters).subscribe();
  }

  getCurrentFoundMatchs(): Observable<any[]> {
    return this.currentFoundMatchs$.asObservable();
  }

  getCurrentFoundAddress(): any[] {
    return this.currentFoundAddress;
  }

  addSearchParameter(key: string, value: any) {
    this.currentSearch[key] = value;
  }

  removeSearchParameter(key: string) {
    delete this.currentSearch[key];
  }

  get globalMode() {
    return this.globalMode$.getValue();
  }

  get community() {
    return this.community$.getValue();
  }

  get useProfileTagsMode() {
    return this.useProfileTagsMode$.getValue();
  }

  setGlobalMode(isGlobal: boolean) {
    this.globalMode$.next(isGlobal);
  }

  setCommunity(community: Community) {
    this.community$.next(community);
  }

  setUseProfileTagsMode(bool) {
    this.useProfileTagsMode$.next(bool);
  }
}
