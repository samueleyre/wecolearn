import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { finalize, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { _throw } from 'rxjs-compat/observable/throw';

import { SocketService } from '~/shared/components/socket/service';

const retryStrategy = ({
       maxRetryAttempts = 3,
       scalingDuration = 1000, // tslint:disable-line no-magic-numbers
       excludedStatusCodes = [],
       }: {
         maxRetryAttempts?: number,
         scalingDuration?: number,
         excludedStatusCodes?: number[],
       } = {}) =>
  (attempts: Observable<any>) =>
    attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
        if (
              retryAttempt > maxRetryAttempts ||
              excludedStatusCodes.find(e => e === error.status)
          ) {
          return _throw(error);
        }
        console.log(
              `Attempt ${retryAttempt}: retrying in ${retryAttempt *
              scalingDuration}ms`,
          );
          // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!')),
    );


@Injectable()
export class SocketInit {
  public static con = null;

  constructor(private service: SocketService) {}


  public handShake(): Observable<any> {
    return new Observable<any>(
      (observer) => {
        const subs = this
                .service
                .handshake()
                .pipe(
                    tap((val) => {
                        console.log(val);
                    }),
                    retryWhen(
                        retryStrategy(
                            {
                                maxRetryAttempts : 100,
                                scalingDuration : 5000,
                                excludedStatusCodes : [this.service.ERROR_AUTH],
                            },
                         ),
                   ),
                )
                .subscribe(
                  (value) => {
                    observer.next(value);
                  },
                  (error) => {
                    observer.next(false);
                  },
                );
        return {
          unsubscribe : () => {
            subs.unsubscribe();
          },
        };
      });
  }
}

// on souscrit a la requête ...
// on rerty uniquement quand il y a des problème d'api et de connexionn ...
// on ne retry pas quand la le token est invalid
