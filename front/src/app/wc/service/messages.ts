import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";


const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  route: string = '/api';

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  private sentMessages: Array<Message>;
  private receivedMessages: Array<Message>;


    // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor(public ClientService: ClientService, protected http : Http) {
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
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  sendMessage(message: Message): Observable<string> {

      console.log("WTF !!!", message)
      // message.sender = this.clientService.currentService
      return this.http.post(`/api/message`, message).map((response: Response) => {
          // console.log(response)
          return "OK";
          // this.newMessages.next(message);
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

      this.ClientService.get()
          .subscribe(
              (user: Client) => {
                  console.log("client Service", user)
                  this.sentMessages = user.sent_messages;
                  this.receivedMessages = user.received_messages;
                  this.generateMessages();
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

                    // console.log("FOO", message, Object.keys(threads).length, senderOrReceiver)
                    // console.log("message[senderOrReceiver].id", message[senderOrReceiver].id)

                if(  Object.keys(threads).length === 0 || (Object.keys(threads).indexOf(message[senderOrReceiver].id) === -1)) {

                        // console.log("1 - messagethreading", message)

                    let thread = new Thread(message[senderOrReceiver].id, message[senderOrReceiver].first_name, message[senderOrReceiver].avatarSrc);

                    threads[message[senderOrReceiver].id] = thread;

                    message.thread = thread;

                } else {

                        // console.log("2 - messagethreading", message)
                    message.thread = threads[message[senderOrReceiver].id];

                }


            // console.log("message added", message)
            this.addMessage(message)


        });
  }


  private generateMessages() {


      if (this.sentMessages) {

          console.log("arrived here")
          this.generateThreadAndAddMessage("receiver");

      }

      if (this.receivedMessages) {

          this.generateThreadAndAddMessage("sender");

      }



  }






}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
