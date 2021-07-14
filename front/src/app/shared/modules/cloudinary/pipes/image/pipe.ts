import { Pipe, PipeTransform } from '@angular/core';

import { Image } from '~/core/entities/image/entity';
import { image as defaultImage } from '~/config/image';

@Pipe({
  name: 'cloudinaryImagePipe',
  pure: false,
})
export class CloudinaryImagePipe implements PipeTransform {
  transform(image: Image, extension = 'jpg'): any {
    if (!image) {
      return defaultImage.default_200px;
    }
    let version = '';
    if (image.version) {
      version = `v${image.version}/`;
    }
    return `https://res.cloudinary.com/wecolearn/image/upload/c_scale,w_324/${version}images/${image.public_id}.${extension}`;
  }
}
