import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';
import { Tag } from '~/core/entities/tag/entity';
import { SearchService } from '~/core/services/search/search.service';
import { BIO } from '~/config/bio.const';


@Component({
  selector: 'profile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class ProfileComponent extends DestroyObservable {
  constructor(private _router: Router, private _searchService: SearchService) {
    super();
  }

  @Input() user: User;

  searchByTag(tag: Tag) {
    const searchTag = { ...tag };
    if (searchTag.type !== 0) {
      searchTag.id = null;
      searchTag.type = 0;
    }
    this._searchService.setSearchInputAsTag(searchTag);
    this._router.navigate([NAV.search]);
  }

  tagDisplayTitle(tag: Tag): string {
    return `${tag.name}${tag.tag_domains.length > 0 ? ` | ${tag.tag_domains[0].name}` : ''}`.trim();
  }

  getBio(bio): string {
    if (bio) {
      return bio;
    }
    return BIO.default;
  }
}
