import {
  Component,
  OnInit,
  ViewChild, ElementRef, AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';

import { SearchService } from '../../../../core/services/search/search';
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
    [SearchMeta.tagNotFound]: `<i>Malgré nos efforts, nous n'avons trouvé personne correspondant à votre recherche. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?</i>`,
    noResults: `<i>Zut, nous n'avons pas trouvé de profils qui correspondent à vos critères... <br>Pour étendre le champs de
    recherche, ajoutez des domaines d'apprentissage dans votre profil !</i>`,
    noResultsWithSearch: `<i>Nous n’avons trouvé personne intéressé par cet apprentissage autour de chez vous</i>`,
    localProfiles: `<i>Malgré nos efforts, nous n'avons trouvé personne correspondant à vos domaines d'apprentissage. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?</i>`,
    [SearchMeta.userLearnTags]: '<i>Nous avons sélectionné ces profils autour de chez vous.</i>',
    [SearchMeta.userLearnTagDomains]: '<i>Nous avons sélectionné ces profils autour de chez vous.</i>',
    [SearchMeta.userKnowTags]: '<i>Nous avons sélectionné ces profils autour de chez vous.</i>',
    [SearchMeta.userKnowTagDomains]: '<i>Nous avons sélectionné ces profils autour de chez vous.</i>',
    globalMode: `<i>Nous avons sélectionné ces profils pour vous.</i>`,
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
      params['tag'] = this.searchService.searchInputValue;
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
      if (meta[SearchMeta.tagNotFound]) {
        return this.messages[SearchMeta.tagNotFound];
      }
      const metaKeys = Object.keys(meta).filter(
        val =>
          Object.keys(this.messages).indexOf(val) !== -1 &&
          meta[val] === true,
      );

      if (metaKeys.length > 0) {
        // if got results without using matching tags
        if (!this.searchService.searchInputValue && meta[SearchMeta.orderByDistance]) {
          return this.messages.localProfiles;
        }
        // found match !
        if (this.searchService.globalMode) {
          return this.messages.globalMode;
        }
        return this.messages[metaKeys[0]];
      }
    }
    return null;
  }

  onScroll(ev) {
    if (this.cards.length < SEARCH.default.max) {
      return;
    }
    SearchService.first += SEARCH.default.max;
    this.search({
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

  search(filters: {}) {
    let filledFilters = filters;
    if (this.searchInput) {
      filledFilters = {
        ...filters,
        tag: this.searchInput,
      };
    }
    this.searchService.search(filledFilters).subscribe();
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

