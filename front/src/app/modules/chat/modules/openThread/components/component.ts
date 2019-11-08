import {
  Component, Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { Thread } from '~/core/entities/thread/entity';
import { Threads } from '~/modules/chat/services/threads';

@Component({
  selector: 'open-thread',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],

})


export class OpenThreadComponent implements OnInit {
  constructor(private threadsService: Threads, private router: Router) {
  //
  }


  @Input() user: User;
  @Input() style;

  ngOnInit(): void {
    //
  }


  openThread() {
    const thread = new Thread({ id: this.user.id, name: this.user.first_name, image: this.user.image });
    this.threadsService.setCurrentThread(thread);
    this.router.navigate(['dashboard/discussion']);
  }
}
