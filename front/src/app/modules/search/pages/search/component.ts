import {
  Component,
  OnInit,
  Injectable, ViewChild, ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';

import { SearchService } from '../../services/search';
import { SEARCH } from '../../config/main';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SearchComponent implements OnInit {
  public cards: any[] = [];
  public scrolling;
  public searchInput = null;
  private lastScrollTop = 0;
  private direction = 'down';
  @ViewChild('cardsContainer') cardsContainerElementRef: ElementRef;


  constructor(
        private router: Router,
        private _searchService: SearchService,
        private deviceService: DeviceDetectorService,
  ) {
    this.detectScrollDown();
  }

  ngOnInit() {
    this.load();
  }


  load(): void {
        // todo: if tag and lat/long are in url, get them

    this._searchService.getCurrentFoundClients().subscribe((clients: User[]) => {
      if (SearchService.searchType !== 'scroll' && this.cardsContainerElementRef) {
        // new SEARCH
        this.cardsContainerElementRef.nativeElement.scrollTo(0, 0);
        this.cards = clients;
      } else {
        // SCROLL SEARCH
        this.cards = this.cards.concat(clients.slice(SearchService.max - SEARCH.default.max));
      }
    });

    // init search on page load
    this._searchService.search().subscribe();
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

