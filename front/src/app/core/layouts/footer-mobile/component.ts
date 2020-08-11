import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ThreadsService } from '~/core/services/chat/threads.service';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable({
  providedIn: 'root',
})
export class FooterMobileComponent implements OnInit {
  public countNotRead$: Observable<number>;

  constructor(
    private _threadsService: ThreadsService,
  ) {
  }

  ngOnInit() {
    this.countNotRead$ = this._threadsService.orderedThreads
      .pipe(map(threads => threads.reduce((count, thread) => (count + thread.countNotRead), 0)));
  }
}
