import {
  Component,
  OnInit,
  Injectable, Output, EventEmitter, ViewChild, ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';

import { TagService } from '~/core/services/tag';

import { SearchService } from '../../services/search';


@Component({
  selector: 'app-searchbar',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class SearchBarComponent implements OnInit {
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
}
