import {
  Component,
  Injectable, Input,
} from '@angular/core';

import { User } from '~/shared/entities/user/entity';


@Component({
  selector: 'profile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})

@Injectable()
export class ProfileComponent {
  @Input() user: User;
}
