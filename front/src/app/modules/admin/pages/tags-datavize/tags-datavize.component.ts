import { Component, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { AdminTagService } from '~/modules/tags/services/admin-tag.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagsGroupedByDomainInterface } from '~/core/interfaces/tag/tags-grouped-by-domain.interface';


@Component({
  selector: 'app-tags-datavize',
  templateUrl: './tags-datavize.component.html',
  styleUrls: ['./tags-datavize.component.scss'],
})
export class TagsDatavizeComponent extends DestroyObservable implements OnInit {
  tags$: BehaviorSubject<TagsGroupedByDomainInterface | null> = new BehaviorSubject(null);
  maxIteration = 10;

  constructor(
    private tagService: AdminTagService,
  ) {
    super();
  }

  ngOnInit() {
    this.tagService.tags$
      .pipe(
        filter(tags => tags.length > 0),
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
    this.tagService.list().subscribe();
  }
}
