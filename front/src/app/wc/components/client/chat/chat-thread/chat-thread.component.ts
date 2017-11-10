import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from './../../../../service/threads.service';
import { Thread } from '../../../../entities/thread/entity';
import {GPPDComponent} from "../../../../component/gppd";

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected = false;
  private avatarSrcBase : string;


  constructor(public threadsService: ThreadsService) {
  }

  ngOnInit(): void {

    this.avatarSrcBase =  GPPDComponent.updateUrl('/home/');
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
