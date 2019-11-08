import { Pipe, PipeTransform } from '@angular/core';

import { Tag } from '~/core/entities/tag/entity';

@Pipe({
  name: 'tagPipe',
  pure: false,
})
export class TagPipe implements PipeTransform {
  size: number;

  transform(items: Tag[], type: number, length: number): any {
    this.size = 0;
    if (!items) {
      return items;
    }
    return items.filter((item , i) => {
      const ret = item['type'] === type;
      if (ret) {
        this.size = this.size + 1;
      }
      return ret && this.size < length;
    });
  }
}
