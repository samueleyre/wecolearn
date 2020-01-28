import { publishReplay, refCount, scan, map, tap } from 'rxjs/operators';
import { of as observableOf, Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';


import { User } from '~/core/entities/user/entity';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';
import { ClientService } from '~/core/services/client';

type IMessagesOperation = (messages: Message[]) => Message[];

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  protected _loading$ = new BehaviorSubject<boolean>(false);
  protected _loaded$ = new BehaviorSubject<boolean>(false);

  // `messages` is a stream that emits an array of the most up to date messages
  public messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  // `updates` receives _operations_ to be applied to our `messages`
  public updates: Subject<any> = new Subject<any>();

  public currentClient: User = new User();
  private sentMessages: Message[];
  private receivedMessages: Message[];

  public messagesToUpdate: Message[] = [];

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  get loading(): boolean {
    return this._loading$.value;
  }

  constructor(public clientService: ClientService, protected http: HttpClient) {
    this.updates.pipe(
        // watch the updates and accumulate operations on the messages
        scan((messages: Message[], operation: IMessagesOperation) => operation(messages), []),

      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of messages
        publishReplay(1),
        refCount(),
    ).subscribe(
      (messages) => {
        this.messages.next(messages);
      },
    );

    this.create.pipe(
      map((message: Message): IMessagesOperation => (messages: Message[]) => messages.concat(message))).subscribe(this.updates);

    // `markThreadAsRead` takes a Thread and then puts an operation on the `updates` stream to mark the Messages as read
    this.markThreadAsRead.pipe(
      map((thread: Thread) => (messages: Message[]) => messages.map((message: Message) => {
        console.log(message.sender.id, this.currentClient.id, message.is_read, message.message)
        if (message.thread.id === thread.id && !message.is_read && message.sender && message.sender.id !== this.currentClient.id) {
          message.is_read = true;
          this.addMessageToUpdate(message);
        }
        return message;
      }))).subscribe(this.updates);
  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.create.next(message);
  }

  addMessageToUpdate(message: Message): void {
    const messageToSend = { ...message };
    if ('thread' in messageToSend) {
      delete messageToSend.thread;
    }
    this.messagesToUpdate.push(messageToSend);
  }

  pushUpdatedMessages(): Observable<object> {
    console.log('should send message', this.messagesToUpdate)
    if (this.messagesToUpdate.length > 0) {
      return this.http.patch(`/api/messages`, this.messagesToUpdate);
    }

    return observableOf(null);
  }

  public init(): void {
    this.getMessages();
  }

  private getMessages(): void {
    this._loading$.next(true);
    this.clientService.get()
      .subscribe(
        (user: User) => {
          if (user && null === this.currentClient.id) {
            this.currentClient = user;
            this.http.get('/api/messages').subscribe(
              (array: any) => {
                this.sentMessages = array.sent_messages;
                this.receivedMessages = array.received_messages;
                this.generateMessages();
                this._loading$.next(false);
              },
            );
          } else {
            this._loading$.next(false);
          }
        });
  }

  private generateThreadAndAddMessage(senderOrReceiver: string) {
    const threads: Object = {};
    const typeOfMessage = (senderOrReceiver === 'sender') ? 'receivedMessages' : 'sentMessages';

    this[typeOfMessage].map((message: Message) => {
      if (Object.keys(threads).length === 0 || (Object.keys(threads).indexOf(String(message[senderOrReceiver].id)) === -1)) {
        const thread = new Thread({
          id: message[senderOrReceiver].id,
          name: message[senderOrReceiver].first_name,
          image: message[senderOrReceiver].image,
        });
        threads[message[senderOrReceiver].id] = thread;
        message.thread = thread;
      } else {
        message.thread = threads[message[senderOrReceiver].id];
      }
    });
  }

  private generateMessages() {
    if (this.sentMessages) {
      this.generateThreadAndAddMessage('receiver');
    }

    if (this.receivedMessages) {
      this.generateThreadAndAddMessage('sender');
    }

    const messagestoBeAdded = this.sentMessages.concat(this.receivedMessages);

    _.sortBy(messagestoBeAdded, (m: Message) => m.created)
      .map((message: Message) => {
        this.addMessage(message);
      });
  }

  public post(message: Message): Observable<Object> {
    return this.http.post(`/api/message`, message);
  }

  public patch(message: Message): Observable<Object> {
    return this.http.patch(`/api/message`, message);
  }
}

