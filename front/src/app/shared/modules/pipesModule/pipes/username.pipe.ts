import { Pipe, PipeTransform } from '@angular/core';

import { User } from '~/core/entities/user/entity';


@Pipe({ name: 'username' })


export class UsernamePipe implements PipeTransform {
  constructor() {}
  transform(user: User) {
    let ret = `${user.first_name[0].toLocaleUpperCase() + user.first_name.slice(1)}`;
    if (user.last_name) {
      ret += ` ${user.last_name[0].toLocaleUpperCase() + user.last_name.slice(1)}`;
    }
    return ret;

  }
}
