import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from './../../../../service/threads.service';
import { Thread } from '../../../../entities/thread/entity';
import {Logged} from "../../../../../applicativeService/authguard/logged";

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent {
  threads: Observable<any>;

  constructor(public threadsService: ThreadsService) {
    // threadsService.resetThreads();
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit():void{
    Logged.get().subscribe( (logged:boolean) => {

      if (!logged) {
        this.threadsService.resetThreads();
      }

    });

  }

  ngOnExit(): void { // does this work ?
    this.threadsService.resetThreads();
  }



}
