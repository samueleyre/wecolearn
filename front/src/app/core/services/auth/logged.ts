import { Observable, Subject, Subscriber } from 'rxjs';

export class Logged {
  private static loggedSubject = new Subject<boolean>();
  private static loggedStatic: boolean = null;


  public static set(status: boolean) {
    Logged.loggedStatic = status;
    Logged.loggedSubject.next(status);
  }

  public static get(): Observable<boolean> {
    if (null === Logged.loggedStatic) {
      return Logged.loggedSubject.asObservable();
    }
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(Logged.loggedStatic));
  }
}
