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
import {MessagesService} from "../../../../service/messages";
import { image }            from "../../../../../applicativeService/constants/image";


@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected = false;
  private avatarSrcBase : string;
  private baseImageName : string = image.default_200px;


  constructor(public threadsService: ThreadsService, private messagesService: MessagesService ) {
  }

  ngOnInit(): void {

    this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this.thread);
    this.messagesService.pushUpdatedMessages().subscribe();
  }
}
