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
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SearchComponent implements OnInit {
  public cards: any[] = [];
  public scrolling;
  public searchInput = null;
  private lastScrollTop = 0;
  private direction = 'down';

  public messages = {
    [SearchMeta.TAGNOTFOUND]: `Malgré nos efforts, nous n'avons trouvé personne correspondant à votre recherche. 😢 <br>
    Peut-être que les profils suivant pourront tout de même vous intéresser ?`,
    noResults: `Mince, nous n'avons pas trouvé de profils qui correspondent à vos critères... Pour étendre le champs de
    recherche, pensez à ajouter des domaines d'apprentissage dans votre profil !`,
  };

  @ViewChild('cardsContainer', { static: false }) cardsContainerElementRef: ElementRef;

  constructor(
        private router: Router,
        private _searchService: SearchService,
        private deviceService: DeviceDetectorService,
  ) {
  }

  ngOnInit() {
    this.load();
    this.detectScrollDown();
  }

  load(): void {
    this._searchService.getCurrentFoundClients().subscribe((clients: User[]) => {
      if (this._searchService.searchType !== 'scroll' && this.cardsContainerElementRef) {
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
    if (this._searchService.searchInputValue) {
      params['tag'] = this._searchService.searchInputValue;
    }
    this._searchService.search(params).subscribe();
  }

  get searchMessage(): string {
    if (!this.loading && this.cards.length === 0) {
      return this.messages.noResults;
    }
    if (this._searchService.searchMeta) {
      return this.messages[this._searchService.searchMeta];
    }
    return null;
  }

  onScroll(ev) {
    SearchService.max += SEARCH.scrollLatence;
    this.search({ max: SearchService.max });
  }

  onScrollMobile(ev) {
    this.timeOutScroll();
    SearchService.max += SEARCH.scrollLatence;
    this.search({ max: SearchService.max });
  }

  timeOutScroll() {
    this.scrolling = true;
    setTimeout(() => {
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

    this._searchService.search(filledFilters).subscribe();
  }

  get loading(): boolean {
    return this._searchService.loading;
  }

  get isMobile() {
    return this.deviceService.isMobile();
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

