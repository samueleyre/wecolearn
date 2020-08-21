import {
  Component,
  OnInit,
  ViewChild, ElementRef, AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';
import { Tag } from '~/core/entities/tag/entity';
import { SearchService } from '~/core/services/search/search';
import { TagDomain } from '~/core/entities/tag/TagDomain';

import { SEARCH } from '../../config/main';


@Component({
  template: '',
})export class SearchComponentBase implements OnInit, AfterViewInit {
  public cards: any[] = [];
  public scrolling;
  public searchInput = null;
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
  ) {
  }

  ngOnInit() {
    this.detectScrollDown();
  }

  ngAfterViewInit() {
    this.load();
  }

  load(): void {
    this.searchService.getCurrentFoundClients().subscribe((users: User[]) => {
      if (this.searchService.searchType !== 'scroll') {
        // new SEARCH
        this.cardsContainerElementRef.nativeElement.scrollTo(0, 0);
        this.cards = users;
      } else {
        // SCROLL SEARCH
        users.forEach((user) => {
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
    let filledFilters = filters;
    const val = this.searchService.searchInputValue;
    if (this.searchService.searchInputValue) {
      filledFilters = {
        ...filters,
        tag: (val instanceof Tag) ? val : null,
        tagDomain: (val instanceof TagDomain) ? val : null,
      };
    }
    this.searchService.search(filledFilters).subscribe();
  }

  get currentSearchTag(): Tag | null {
    const val = this.searchService.searchInputValue;
    console.log({ val });
    console.log((val instanceof Tag));
    return (val instanceof Tag) ? val : null;
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

