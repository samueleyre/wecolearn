import { publishReplay, refCount, filter, scan, map } from 'rxjs/operators';
import { of as observableOf, Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';


import { User } from '~/core/entities/user/entity';
import { Message } from '~/core/entities/message/entity';
import { Thread } from '~/core/entities/thread/entity';
import { ClientService } from '~/core/services/client';


const initialMessages: Message[] = [];

type IMessagesOperation = (messages: Message[]) => Message[];


@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  protected _loading$ = new BehaviorSubject<boolean>(false);
  protected _loaded$ = new BehaviorSubject<boolean>(false);

  // a stream that publishes new messages only once
  public newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  public messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
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

  constructor(public clientService: ClientService,
              protected http: HttpClient,
  ) {
    this.messages = this.updates.pipe(
        // watch the updates and accumulate operations on the messages
        scan((messages: Message[], operation: IMessagesOperation) => operation(messages), initialMessages),

        // make sure we can share the most recent list of messages across anyone
        // who's interested in subscribing and cache the last known list of
        // messages
        publishReplay(1),
        refCount());

    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    this.create.pipe(
      map((message: Message): IMessagesOperation => (messages: Message[]) => messages.concat(message))).subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead.pipe(
        map((thread: Thread) => (messages: Message[]) => messages.map((message: Message) => {
              // note that we're manipulating `message` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
          if (message.thread.id === thread.id && !message.is_read && message.sender && message.sender.id !== this.currentClient.id) {
                // to, say, copy the Message object or some other 'immutable' here
            message.is_read = true;
            this.addMessageToUpdate(message);
          }
          return message;
        }))).subscribe(this.updates);
  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  addMessageToUpdate(message: Message): void {
    const messageToSend = { ...message };
    if ('thread' in messageToSend) {
      delete messageToSend.thread;
    }
    this.messagesToUpdate.push(messageToSend);
  }

  pushUpdatedMessages(): Observable<object> {
    if (this.messagesToUpdate.length > 0) {
      return this.http.patch(`/api/messages`, this.messagesToUpdate);
    }

    return observableOf(null);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
        filter((message: Message) =>
          // belongs to this thread
          (message.thread.id === thread.id) &&
              // and isn't authored by this user
              (message.sender && (message.sender.id !== user.id)),
        ));
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
    this.messages = of();

    let messagestoBeAdded: Message[];

    if (this.sentMessages) {
      this.generateThreadAndAddMessage('receiver');
    }

    if (this.receivedMessages) {
      this.generateThreadAndAddMessage('sender');
    }

    messagestoBeAdded = this.sentMessages.concat(this.receivedMessages);

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

