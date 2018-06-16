import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

import * as _ from 'lodash';
import {ISubscription} from "rxjs/Subscription";
import {LoggerService} from "../../applicativeService/logger/service";
import {Router} from "@angular/router";


const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}


@Injectable()
export class MessagesService {

    static initialPeriod = 120000;

    private alive: boolean; // used to unsubscribe from the IntervalObservable
    // when OnDestroy is called.
    private timer : Observable<number>;

    private timerSubscription : ISubscription;


    public route: string = '/api';

    // a stream that publishes new messages only once
    public newMessages: Subject<Message> = new Subject<Message>();

    // `messages` is a stream that emits an array of the most up to date messages
    public messages: Observable<Message[]>;

    // `updates` receives _operations_ to be applied to our `messages`
    // it's a way we can perform changes on *all* messages (that are currently
    // stored in `messages`)
    public updates: Subject<any> = new Subject<any>();

    private currentClient: Client;
    private sentMessages: Array<Message>;
    private receivedMessages: Array<Message>;

    public messagesToUpdate: Array<Message> = [];


    // action streams
    create: Subject<Message> = new Subject<Message>();
    markThreadAsRead: Subject<any> = new Subject<any>();

  constructor(public ClientService: ClientService, protected http : Http, private loggerService: LoggerService, private router: Router,
  ) {
    this.alive = true;
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((messages: Message[],
             operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .publishReplay(1)
      .refCount();

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
    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id && message.is_read === false && message.sender && message.sender.id !== this.currentClient.id) {
              message.is_read = true;
              this.addMessageToUpdate(message);
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.loggerService.log("adding message", message)
    this.newMessages.next(message);
  }

  addMessageToUpdate(message: Message): void {
      this.loggerService.log("add to be updated", message)
    this.messagesToUpdate.push(message);
  }

  pushUpdatedMessages(): Observable<void> {

    if (this.messagesToUpdate.length > 0) {
        this.loggerService.log("going to be sent", this['messagesToUpdate'])
      return this.http.patch(`/api/messages`, this.messagesToUpdate).map((response: Response) => {
          this.loggerService.log(response.json());
        // this.messagesToUpdate = [];
      });


    } else {

      return Observable.of(null);

    }


  }

  sendMessage(message: Message): Observable<Message> {

      return this.http.post(`/api/message`, message).map((response: Response) => {
          return response.json();
      });


  }

  updateMessage(message: Message): Observable<void> { // todo : can be used to edit old message also

    return this.http.patch(`/api/message`, message).map((response: Response) => {
        this.loggerService.log(response.json());
    });


  }


  messagesForThreadUser(thread: Thread, user: Client): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {

               // belongs to this thread
        return (message.thread.id === thread.id) &&
               // and isn't authored by this user
            (message.sender && (message.sender.id !== user.id)) ;

            // || (message.receiver && (message.receiver.id !== user.id));

    });
  }

  public init() : void {

      this.getMessages();

  }

  public initTimer() : void {

    this.newTimer();

  }

  private newTimer(period:number = MessagesService.initialPeriod) : void {


    this.timer = TimerObservable.create(10000, period)
      .takeWhile(() => this.alive);

    // only fires when component is alive
    this.timerSubscription = this.timer.subscribe(() => {
      this.checkNewMessages();
    });

  }

  private checkNewMessages() : void {

    this.ClientService.pull()
      .subscribe(
        (messages: Array<Message>) => {
          _.sortBy(messages, (m: Message) => m.created)
            .map((message: Message) => {
              message.thread = new Thread(message.sender.id, message.sender.first_name, (message.sender.image) ? message.sender.image.filename : null);
              this.addMessage(message);
            });
        });
  }

  private getMessages() :void {

    let getClientSubscribe = this.ClientService.get()
      .subscribe(
        (user: Client) => {
          this.loggerService.log("client Service called in messages service", this.currentClient)
          if (user && this.router.url === "/search" && undefined === this.currentClient) {
            this.currentClient = user;
            this.sentMessages = user.sent_messages;
            this.receivedMessages = user.received_messages;
            this.generateMessages();
            this.loggerService.log("shoud unsubscribe")
            getClientSubscribe.unsubscribe(); // this doens't work ?

          }
        });




  }


  private generateThreadAndAddMessage(senderOrReceiver: string) {

    let threads : Object = {};
    let typeOfMessage : string;

    if (senderOrReceiver === "sender") {
        typeOfMessage = "receivedMessages";
    } else {
        typeOfMessage = "sentMessages";
    }


    this[typeOfMessage].map( (message: Message) => {

      if(  Object.keys(threads).length === 0 || (Object.keys(threads).indexOf(message[senderOrReceiver].id) === -1)) {
          let thread = new Thread(message[senderOrReceiver].id, message[senderOrReceiver].first_name, (message[senderOrReceiver].image) ? message[senderOrReceiver].image.filename : null);
          threads[message[senderOrReceiver].id] = thread;
          message.thread = thread;
      } else {
          message.thread = threads[message[senderOrReceiver].id];
      }

    });


  }

  private generateMessages() {

    this.messages = new EmptyObservable();
    // console.log("messages", this['messages'])

    let messagestoBeAdded: Array<Message> = [];

      if (this.sentMessages) {
          this.generateThreadAndAddMessage("receiver");
      }

      if (this.receivedMessages) {
          this.generateThreadAndAddMessage("sender");
      }

      messagestoBeAdded = this.sentMessages.concat(this.receivedMessages);

      // let sorted =
          _.sortBy(messagestoBeAdded, (m: Message) => m.created)
          .map((message: Message) => {
          this.addMessage(message)
      });

      // this.loggerService.log("what is wrong with the time ?", new Date())
      // this.loggerService.log("these should be ordered", messagestoBeAdded)
  }

  public stopNewMessageLoop() {
    this.alive = false;
  }

  public changePeriod(newPeriod: number) {

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.newTimer(newPeriod);


  }

}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
