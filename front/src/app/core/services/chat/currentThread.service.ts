import { BehaviorSubject } from 'rxjs';

import { Thread } from '~/core/entities/thread/entity';

export class CurrentThreadService {
  // `currentThread` contains the currently selected thread
  public static currentThread: BehaviorSubject<Thread> = new BehaviorSubject<Thread>(new Thread());
}
