import { Image } from '~/core/entities/image/entity';

export class Community {
  public id: number | null;
  public name: string;
  public count?: number;
  public image?: Image;
  // tslint:disable-next-line:variable-name
  public is_main?: boolean;

  constructor(obj?: any) {
    this.name = obj && obj.name ? obj.name : null;
    this.count = obj && obj.count ? obj.count : null;
    if (obj) {
      if ('id' in obj) {
        this.id = obj.id;
      }
      if ('image' in obj) {
        this.image = new Image(obj.image);
      }
      if ('is_main' in obj) {
        this.is_main = obj.is_main;
      }

    }
  }
}
