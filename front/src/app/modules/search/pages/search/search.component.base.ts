import {
  Component,
  OnInit,
  ViewChild, ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as _ from 'lodash';

import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';

import { SearchService } from '../../../../core/services/search/search';
import { SEARCH } from '../../config/main';


@Component({
  template: '',
})export class SearchComponentBase implements OnInit {
  public cards: any[] = [];
  public scrolling;
  public searchInput = null;
  private lastScrollTop = 0;
  private direction = 'down';

  public messages = {
    [SearchMeta.tagNotFound]: `Malgré nos efforts, nous n'avons trouvé personne correspondant à votre recherche. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?`,
    noResults: `Zut, nous n'avons pas trouvé de profils qui correspondent à vos critères... Pour étendre le champs de
    recherche, pensez à ajouter des domaines d'apprentissage dans votre profil !`,
    noResultsWithSearch: `Nous n’avons trouvé personne intéressé par cet apprentissage autour de chez vous`,
    localProfiles: `Malgré nos efforts, nous n'avons trouvé personne correspondant à vos domaines d'apprentissage. <br>
    Peut-être que les profils suivant pourront aussi vous intéresser ?`,
    [SearchMeta.userLearnTags]: 'Nous avons sélectionné ces profils autour de chez vous.',
    [SearchMeta.userLearnTagDomains]: 'Nous avons sélectionné ces profils autour de chez vous.',
    [SearchMeta.userKnowTags]: 'Nous avons sélectionné ces profils autour de chez vous.',
    [SearchMeta.userKnowTagDomains]: 'Nous avons sélectionné ces profils autour de chez vous.',
  };

  @ViewChild('pageContainer', { static: false }) cardsContainerElementRef: ElementRef;

  constructor(
    private router: Router,
    private searchService: SearchService,
  ) {
  }

  ngOnInit() {
    this.load();
    this.detectScrollDown();
  }

  load(): void {
    this.searchService.getCurrentFoundClients().subscribe((clients: User[]) => {
      if (this.searchService.searchType !== 'scroll') {
        // new SEARCH
        this.cardsContainerElementRef.nativeElement.scrollTo(0, 0);
        this.cards = clients;
      } else {
        // SCROLL SEARCH
        if (clients.length > SearchService.max) {
          this.cards = _.uniqBy(this.cards.concat(clients.slice(SearchService.max - SEARCH.default.max)), 'id');
        } else {
          this.cards = clients;
        }
      }
    });

    // init search on page load
    const params = {};
    if (this.searchService.searchInputValue) {
      params['tag'] = this.searchService.searchInputValue;
    }
    this.searchService.search(params).subscribe();
  }

  get searchMessage(): string | null {
    if (this.loading) {
      return null;
    }

    let meta = null;
    if (this.searchService.searchMeta) {
      meta = this.searchService.searchMeta;
    }
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
      const metaKeys = Object.keys(meta).filter(val => meta[val] === true);

      if (metaKeys.length > 0) {
        // if got results without using matching tags
        if (!this.searchService.searchInputValue && meta[SearchMeta.orderByDistance]) {
          return this.messages.localProfiles;
        }
        // found match !
        return this.messages[metaKeys[0]];
      }
    }
    return null;
  }

  onScroll(ev) {
    SearchService.max += SEARCH.scrollLatence;
    this.search({ max: SearchService.max });
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

