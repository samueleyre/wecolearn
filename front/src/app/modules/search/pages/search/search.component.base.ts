import {
  Component,
  OnInit,
  ViewChild, ElementRef, AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';
import { Tag } from '~/core/entities/tag/entity';
import { SearchService } from '~/core/services/search/search.service';
import { TagDomain } from '~/core/entities/tag/TagDomain';
import { NAV } from '~/config/navigation/nav';
import { ProfileService } from '~/core/services/user/profile.service';

import { SEARCH } from '../../config/main';


@Component({
  template: '',
})
export class SearchComponentBase implements OnInit, AfterViewInit {
  public cards: any[] = [];
  public scrolling;
  public searchInput = null;
  public nav = NAV;
  private lastScrollTop = 0;
  private direction = 'down';

  public messages = {
    [SearchMeta.tagNotFound]: `Malgré nos efforts, nous n'avons trouvé personne correspondant à votre recherche. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?`,
    noResults: `Zut, nous n'avons pas trouvé de profils qui correspondent à vos critères... <br>Pour étendre le champs de
    recherche, ajoutez des domaines d'apprentissage dans votre profil !`,
    noResultsWithSearch: `Nous n’avons trouvé personne intéressé par cet apprentissage autour de chez vous`,
    notRelevantProfiles: `Malgré nos efforts, nous n'avons trouvé personne correspondant à ces domaines d'apprentissage. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?`,
    foundMatchingResults: 'Profils autour de chez vous.',
    foundSearchTagResults: 'Profils intéressés par cet apprentissage.',
    globalMode: `Profils sélectionnés pour vous.`,
    foundResultsWithSearchTagDomain: `Profils intéressés par ce domaine d'apprentissage`,
  };

  @ViewChild('pageContainer', { static: false }) cardsContainerElementRef: ElementRef;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    this.detectScrollDown();
  }

  ngAfterViewInit() {
    this.load();
  }

  load(): void {
    this.searchService.getCurrentFoundMatchs().subscribe((users: User[]) => {
      if (this.searchService.searchType !== 'scroll') {
        // new SEARCH
        this.cardsContainerElementRef.nativeElement.scrollTo(0, 0);
        this.cards = users;
      } else {
        // SCROLL SEARCH
        users.filter(user => this.cards.findIndex(card => card.id === user.id) === -1).forEach((user) => {
          this.cards.push(user);
        });
      }
    });

    // init search on page load
    const params = {};
    if (this.searchService.searchInputValue) {
      const val = this.searchService.searchInputValue;
      if (val instanceof Tag) {
        params['tag'] = val;
      }
    }
    if (this.searchService.searchInputValue) {
      const val = this.searchService.searchInputValue;
      if (val instanceof TagDomain) {
        params['tagDomain'] = val;
        params[SearchMeta.useProfileTags] = false;
      }
    }
    this.searchService.search(params).subscribe();
  }

  get explorationMode() {
    return !this.searchService.useProfileTagsMode;
  }

  get profileComplete(): boolean {
    return this.profileService.profile.tags.length !== 0;
  }

  get searchMessage(): string | null {
    if (this.loading) {
      return null;
    }

    const meta = this.searchService.searchMeta;

    if (this.cards.length === 0) {
      if (this.searchService.searchInputValue) {
        return this.messages.noResultsWithSearch;
      }
      return this.messages.noResults;
    }

    if (meta) {
      // tag not found
      if (meta[SearchMeta.tagNotFound]) {
        return this.messages[SearchMeta.tagNotFound];
      }

      // if (
      //   this.profileService.profile.tags.length === 0
      //   && !(meta[SearchMeta.searchLearnTag] || meta[SearchMeta.searchByLearnTagDomain])
      // ) {
      //   return this.messages.profileIncomplete;
      // }

      // if found match with matching tags in global mode
      if (this.searchService.globalMode && meta[SearchMeta.useProfileTags]) {
        return this.messages.globalMode;
      }

      // if found match in global Mode without matching tags
      if (this.searchService.globalMode) {
        return this.messages.notRelevantProfiles;
      }

      // if got results with search tag and matching tags
      if (meta[SearchMeta.useProfileTags] && meta[SearchMeta.searchLearnTag]) {
        return this.messages.foundSearchTagResults;
      }

      // if got results with search tag but not matching tags
      if (meta[SearchMeta.searchLearnTag] && !meta[SearchMeta.useProfileTags]) {
        return this.messages.foundSearchTagResults;
      }

      // if got results with a input tag domaine
      if (meta[SearchMeta.searchByLearnTagDomain]) {
        return this.messages.foundResultsWithSearchTagDomain;
      }

      // if got results with matching tags
      if (meta[SearchMeta.useProfileTags]) {
        return this.messages.foundMatchingResults;
      }

      // if got results without using matching tags
      if (!meta[SearchMeta.useProfileTags]) {
        return this.messages.notRelevantProfiles;
      }
    }
    return null;
  }

  onScroll(ev) {
    if (this.cards.length < SEARCH.default.max) {
      return;
    }
    SearchService.first += SEARCH.default.max;
    this.searchOnScroll({
      first: SearchService.first,
    });
  }

  timeOutScroll() {
    this.scrolling = true;
    setTimeout(
      () => {
        this.scrolling = false;
      },
      SEARCH.scrollTimeOut);
  }

  searchOnScroll(filters: {}) {
    this.searchService.searchAgainWithSamefilters(filters);
  }

  get currentSearchTag(): Tag | null {
    const val = this.searchService.searchInputValue;
    return (val instanceof Tag) ? val : null;
  }

  get globalMode(): boolean {
    return this.searchService.globalMode;
  }

  get loading(): boolean {
    return this.searchService.loading;
  }

  get canScroll() {
    return !this.loading && !this.scrolling && (this.direction === 'down');
  }

  private detectScrollDown() {
    window.onscroll = () => {
      const st = window.pageYOffset;
      this.direction = (st > this.lastScrollTop) ? 'down' : 'up';
      this.lastScrollTop = st;
    };
  }
}

