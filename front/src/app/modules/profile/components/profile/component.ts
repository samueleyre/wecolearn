import {
  Component,
  Injectable, Input,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { SearchService } from '~/modules/search/services/search';
import { DestroyObservable } from '~/core/components/destroy-observable';


@Component({
  selector: 'profile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class ProfileComponent extends DestroyObservable {
  constructor(private _searchService: SearchService) {
    super();
  }

  @Input() user: User;

  searchByTag(tag: string) {
    this._searchService.setSearchInput(tag);
    this._searchService.search({ tag })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
