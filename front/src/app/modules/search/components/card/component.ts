import {
    Component,
    OnInit,
    Input,
} from '@angular/core';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { Tag } from '~/core/entities/tag/entity';
import { ProfileService } from '~/core/services/user/profile.service';
import { SearchService } from '~/core/services/search/search.service';
import { BIO } from '~/config/bio.const';
import { NAV } from '~/config/navigation/nav';


@Component({
  selector: 'app-card',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class CardComponent implements OnInit {
  @Input() card: User;
  @Input() searchTag: Tag;
  @Input() showCity = false;

  public tags: Tag[] = [];

  constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private _profileService: ProfileService,
    ) {
  }

  ngOnInit() {
    const foundTag = this.card.tags.find(tag => this.isSearchTag(tag));

    this.tags = _.uniqBy(
      [
        ...foundTag ? [foundTag] : [],
        ...this.card.tags.filter(tag => this.isProfileTag(tag)),
        ...this.card.tags.filter(tag => !this.isSearchTag(tag) && !this.isProfileTag(tag)),
      ],
      'id');
  }

  get profilePublicLink() {
    return NAV.profilePublic;
  }

  isSearchTag(tag: Tag) {
    return this.searchTag && this.searchTag.id && this.searchTag.id === tag.id;
  }

  isProfileTag(tag: Tag): boolean {
    return !!this._profileService.profile.tags.find((t => t.id === tag.id));
  }

  searchByTag(tag) {
    this.searchService.setSearchInputAsTag(tag);
    this.searchService.search({ tag }).subscribe();
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
