import {
  Component,
  OnInit,
  Inject, ChangeDetectorRef, NgZone
} from '@angular/core';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import { ThreadsService } from './../../../../service/threads.service';
import { Thread } from '../../../../entities/thread/entity';
import {Logged} from "../../../../../applicativeService/authguard/logged";
// import { map} from 'rxjs/operators';
// import * as _ from "lodash";
// import {BehaviourSubject} from 'rxjs/BehaviourSubject'


@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent {
  newThreads : BehaviorSubject<Array<Thread>> =
      new BehaviorSubject<Array<Thread>>([]);


  constructor(public threadsService: ThreadsService, private ref: ChangeDetectorRef, private ngZone: NgZone ) {

  }

  ngOnInit():void{

    this.newThreads = this.threadsService.newThreadsSubject;


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
