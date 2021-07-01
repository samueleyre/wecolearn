import { Component, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagsGroupedByDomainInterface } from '~/core/interfaces/tag/tags-grouped-by-domain.interface';
import { CommunityAdminTagService } from '~/modules/tags/services/community-admin-tag.service';
import { ProfileService } from '~/core/services/user/profile.service';


@Component({
  selector: 'app-tags-datavize',
  templateUrl: './tags-datavize.component.html',
  styleUrls: ['./tags-datavize.component.scss'],
})
export class TagsDatavizeComponent extends DestroyObservable implements OnInit {
  tags$: BehaviorSubject<TagsGroupedByDomainInterface | null> = new BehaviorSubject(null);
  maxIteration = 10;

  constructor(
    private _communityAdminTag: CommunityAdminTagService,
    private _profileService: ProfileService,
  ) {
    super();
  }

  ngOnInit() {
    this._communityAdminTag.tagsInCommunity$
      .pipe(
        filter(tags => tags.length > 0),
        map(tags => tags.filter(tag => tag.type === 0
          && !tag.tag_domains.find(td => td.name === tag.name)), // todo : compare ids ! (requires changes on back )
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((tags) => {
      // group tags by tagdomains
        const tagsGroupedByDomain = tags.reduce(
        (grouped: TagsGroupedByDomainInterface, tag, index) => {
          tag.tag_domains.forEach((td) => {
            if (!(td.id in grouped)) {
              grouped[td.id] = {
                tagDomain : td,
                tags : [],
                iterations : 0,
              };
            }

            grouped[td.id].iterations += tag.iteration;

            grouped[td.id].tags.push(tag);
            grouped[td.id].tags.sort((a, b) => b.iteration - a.iteration);

            // use this loop to update max tag iteration
            if (tag.iteration > this.maxIteration) {
              this.maxIteration = tag.iteration;
            }
          });
          return grouped;
        },
        {});
        this.tags$.next(tagsGroupedByDomain);
      });
    this.loadTags();
  }

  get tagsGroupedByDomain(): TagsGroupedByDomainInterface {
    return this.tags$.value;
  }

  get tagDomainIds(): string[] {
    return Object.values(this.tags$.value).sort((a, b) => b.iterations - a.iterations).map(el => el.tagDomain.id);
  }

  getFontSize(iteration: number) {
    const maxFontSize = 34;
    const minFontSize = 14;
    const maxIteration = this.maxIteration;
    const minIteration = 1;

    const size = (iteration - minIteration) * (maxFontSize - minFontSize) / (maxIteration - minIteration) + minFontSize;
    return Math.floor(size) + 'px';
  }

  get loaded(): boolean {
    return this.tagsGroupedByDomain !== null;
  }

  private loadTags() {
    const user = this._profileService.profile;
    this._communityAdminTag.get(user.admin_domain.id).subscribe();
  }
}
