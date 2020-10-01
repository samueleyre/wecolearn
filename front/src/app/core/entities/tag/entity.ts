import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { TagDomain } from '~/core/entities/tag/TagDomain';

export class Tag {
  public id: number | null;
  public name: string;
  // tslint:disable-next-line:variable-name
  public tag_domains: TagDomain[];
  public type: TagTypeEnum;
  public iteration?: number;

  constructor(obj?: {
    id?: number | null,
    name: string | null,
    tag_domains?: TagDomain[] | null,
    type: TagTypeEnum,
    iteration?: number,
  }) {
    this.name = obj && obj.name ? obj.name.toLocaleLowerCase() : null;
    this.tag_domains = obj && obj.tag_domains ? obj.tag_domains : [];
    this.type = obj && 'type' in obj ? obj.type : null;

    if (obj && 'id' in obj) {
      this.id = obj.id;
    }

    if (obj && obj.iteration) {
      this.iteration = obj.iteration;
    }
  }
}
