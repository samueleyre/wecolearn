import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tag } from '~/core/entities/tag/entity';
import { tagTypeEN, TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

/*
Page dedicated to search for profile tags on mobile
 */

@Component({
  selector: 'app-profile-tags-search-bar-page',
  templateUrl: './profile-tags-search-bar-page.component.html',
  styleUrls: ['./profile-tags-search-bar-page.component.scss'],
})
export class ProfileTagsSearchBarPageComponent implements OnInit {
  // get return page in URL
  public origin: string;
  public tagType: TagTypeEnum;

  // tag id list of exceptions not to show
  public tagIdExceptions: number[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      if ('origin' in params && 'tag_type' in params && 'exceptions' in params) {
        this.origin = params['origin'];
        this.tagType = Number(params['tag_type']);
        this.tagIdExceptions = params['exceptions'].split(',').map(Number);
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  goBackToPageWithForm(tag: Tag | null) {
    this._router.navigate(
      [this.origin.split('#')[0]],
      {
        queryParams: { tag_id: tag.id, tag_name: tag.name, tag_type: this.tagType },
        fragment: tagTypeEN[this.tagType],
      });
  }
}
