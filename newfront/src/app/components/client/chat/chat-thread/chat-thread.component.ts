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
import {GPPDComponent} from "../../../component/gppd";
import {MessagesService} from "../../../../service/messages";
import { image }            from "../../../../applicativeService/constants/image";


@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  selected = false;
  private avatarSrcBase : string;
  private baseImageName : string = image.default_200px;
  private _thread: Thread;

  @Input('thread')
  set thread(value: Thread) {
    this._thread = value;
  }


  constructor(public threadsService: ThreadsService, private messagesService: MessagesService ) {
  }

  ngOnInit(): void {

    this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
    if (this._thread.id) {
      this.load();
    }

  }

  load():void {

    this.threadsService.currentThread
        .subscribe( (currentThread: Thread) => {
          this.selected = currentThread &&
              this._thread &&
              (currentThread.id === this._thread.id);
        });



  }

  clicked(event: any): void {
    event.preventDefault();
    this.threadsService.setCurrentThread(this._thread);
    this.messagesService.pushUpdatedMessages().subscribe();
  }
}
