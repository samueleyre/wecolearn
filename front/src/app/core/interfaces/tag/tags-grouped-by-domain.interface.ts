import { TagDomain } from '~/core/entities/tag/TagDomain';
import { Tag } from '~/core/entities/tag/entity';

export interface TagsGroupedByDomainInterface {
  [key: number]: {
    tagDomain: TagDomain,
    tags: Tag[],
    iterations: number,
  };
}
