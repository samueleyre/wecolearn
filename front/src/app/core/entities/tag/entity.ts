import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

export class Tag {
  public id: number | null;
  public name: string;
  public type: TagTypeEnum;
  public iteration?: number;

  constructor(obj?: {
    id: number | null,
    name: string | null,
    type: TagTypeEnum,
    iteration?: number,
  }) {
    this.name = obj && obj.name ? obj.name.toLocaleLowerCase() : null;
    this.type = obj && 'type' in obj ? obj.type : null;

    if (obj && obj.id) {
      this.id = obj.id;
    }

    if (obj && obj.iteration) {
      this.iteration = obj.iteration;
    }
  }
}
