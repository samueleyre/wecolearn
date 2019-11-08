import {
  Component,
  OnInit,
  Injectable, Output, EventEmitter, ElementRef, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { MatAutocompleteTrigger } from '@angular/material';

import { TagService } from '~/shared/services/tag';
import { FooterMobileService } from '~/shared/services/layout/footer-mobile';

import { SearchService } from '../../services/search';


@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SearchBarMobileComponent implements OnInit {
  public searchInputControl = new FormControl();
  public currentlySearching = false;
  autocompleteDisabled = false;
  observableSource: Observable<string[]>;
  @Output() searchInputChange = new EventEmitter();
  @ViewChild('searchBar') searchBarField: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(
        protected tagService: TagService,
        private searchService: SearchService,
        private footerMobileService: FooterMobileService,
        private router: Router,
    ) {
    this.tagService = tagService;
  }


  ngOnInit() {
    this.searchService.getLoading('tag').subscribe((loading) => {
      this.currentlySearching = loading;
    });

    this.searchService.getSearchInput().subscribe((tag: string) => {
      this.searchInputControl.setValue(tag);
    });

    this.observableSource = this.searchInputControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.tagService.findTags(value)),
    );
  }

  search() {
    const filters = {};
    if (this.searchInputControl) {
      filters['tag'] = this.searchInputControl.value;
    }
    this.searchInputChange.next(this.searchInputControl.value);
    this.searchService.search(filters).subscribe();
    this.focusOut();
    this.hideAutocomplete();
  }

  focusOut() {
    this.searchBarField.nativeElement.blur();
  }

  hideAutocomplete() {
    this.autocomplete.closePanel();
  }

  onFocus() {
    this.footerMobileService.searchFocusState.next(true);
  }

  onBlur() {
    this.footerMobileService.searchFocusState.next(false);
  }
}
