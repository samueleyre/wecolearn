import { Tag } from '~/core/entities/tag/entity';

export class TagDomain {
  public id?: number;
  public name: string;
  public emoji: string;
  public hexcolor: string;
  // tslint:disable-next-line:variable-name
  public linked_tag?: Tag;

  constructor(obj?: {
    id?: number,
    name: string,
    emoji: string,
    hexcolor?: string,
    linked_tag?: Tag,
  }) {
    if (obj) {
      if ('id' in obj) {
        this.id = obj.id;
      }
      if ('linked_tag' in obj) {
        this.linked_tag = obj.linked_tag;
      }
      this.name = 'name' in obj ? obj.name : null;
      this.emoji = 'emoji' in obj ? obj.emoji : null;
      this.hexcolor = 'hexcolor' in obj ? obj.hexcolor : null;
    }
  }
}
