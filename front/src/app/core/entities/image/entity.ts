// tslint:disable variable-name

import { image } from '~/config/image';

export class Image {
  public id: number | null;
  public filename: string;
  public version: number | null;
  public public_id: string | null;

  constructor(obj?) {
    this.id = obj && obj.id || null;
    this.filename = obj && obj.filename || image.default_200px;
    this.version = obj && obj.version || null;
    this.public_id = obj && obj.public_id || null;
  }
}
