import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

import { environment } from '~/../environments/environment';

@Injectable()
export class SocketService {
  private static socket;
  public ERROR_API = 1;
  public ERROR_AUTH = 2;
  public ERROR_RABBIT = 3;
  public ERROR_CONNECTION = 5;

  constructor(private localStorage: LocalStorage) {
        // this.socket = io(environment.socketServer);
  }

  connect(): Subject<any> {
    const socket = this.getSocket();


    const observable = new Observable((obs) => {
      socket.on('connect_error', (error) => {
        obs.error({ connextion: true });
      });

      socket.on('message',
                (data) => {
                  obs.next(JSON.parse(data));
                },
                (error) => {
                  console.log('error in message', error);
                });
      return () => {
        socket.disconnect();
      };
    });


    const observer = {
      next : (data: Object) => {
        socket.emit('message', JSON.stringify(data));
      },
    };

    return Subject.create(observer, observable);
  }

  getSocket() {
    const socket = SocketService.socket;
    if (! socket) {
      SocketService.socket = io(environment.socketServer);
    }
    if (socket && !socket.connected) {
      console.log('not connected to server');
      SocketService.socket = io(environment.socketServer);
    }
    return SocketService.socket;
  }

  handshake() {
    const obs = new Observable(
      (observer) => {
        const socket = this.getSocket();

        this.localStorage.getItem('token').subscribe(
          (token) => {
            socket.emit('token', token);
          });
        socket.on('connect_error', (error) => {
          observer.error({ status : this.ERROR_CONNECTION });
          console.log('connect error');
        });
        socket.on('500', (message) => {
          const parsedMessage = JSON.parse(message);
          if (parsedMessage.status === this.ERROR_AUTH) {
            observer.next(false);
          } else {
            observer.error(parsedMessage);
            console.log('500', parsedMessage);
          }
        });
        socket.on('handshake', (message) => {
          observer.next(true);
        });
        return {
          unsubscribe: () => {
            console.log('disconnect');
            socket.disconnect();
          },
        };
      });
    return obs;
  }
}
