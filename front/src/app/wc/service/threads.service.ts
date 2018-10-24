
import {combineLatest, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread } from './../entities/thread/entity';
import { Message } from './../entities/message/entity';
import { MessagesService } from './messages';
import * as _ from 'lodash';
import {LoggerService} from "../../applicativeService/logger/service";
import {EmptyObservable} from "rxjs/observable/EmptyObservable";
import { User } from '../entities/user/entity';


@Injectable()
export class ThreadsService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  public orderedThreads: Observable<Thread[]> = new EmptyObservable();

  // `currentThread` contains the currently selected thread
  currentThread: Subject<Thread> =
    new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService, private loggerService: LoggerService) {

    // `threads` is a observable that contains the most up to date list of threads
    this.threads = messagesService.messages.pipe(
      map( (messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        // console.log("messages to be threaded", messages)
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          // Cache the most recent message for each thread
          const messagesThread: Thread = threads[message.thread.id];
          if (
              (!messagesThread.lastMessage
              || messagesThread.lastMessage.created < message.created)
          ) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      }));

    // `orderedThreads` Observable that contains a newest-first chronological list of threads
    this.orderedThreads = this.threads.pipe(
      map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.created).reverse();
      }));

    // `currentThreadMessages` Observable that contains the set of messages for the currently selected thread
    this.currentThreadMessages = this.currentThread.pipe(
      combineLatest(messagesService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) => {
              return (message.thread.id === currentThread.id)
            })
              // .sortBy(messages, (m: Message) => m.created).reverse()
            .map((message: Message) => {
              // this.loggerService.log("set message", message)
              // console.log("currentThreadMessages ", message, this.currentThread)
              if (message.is_read === false && message.thread.id !== message.receiver.id) { // error here sometimes, saying id is not defined
                message.is_read = true;
                this.messagesService.addMessageToUpdate(message);
              }
              return message; })
            .value();
        } else {
          return [];
        }
      }));

    // when currently selected front is selected, mark all the messages that it contains as read
    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }

  resetThreads(): void {
    this.orderedThreads = new EmptyObservable();
    this.messagesService.currentClient = new User();

  }

}

export const threadsServiceInjectables: Array<any> = [
  ThreadsService
];
