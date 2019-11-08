import { Pipe, PipeTransform } from '@angular/core';

import { Image } from '~/shared/entities/image/entity';

@Pipe({
  name: 'cloudinaryImagePipe',
  pure: false,
})
export class CloudinaryImagePipe implements PipeTransform {
  transform(image: Image): any {
    if (!image) {
      return image;
    }
    let version = '';
    if (image.version) {
      version = `v${image.version}/`;
    }
    return `https://res.cloudinary.com/wecolearn/image/upload/c_scale,w_324/${version}images/${image.public_id}.jpg`;
  }
}
