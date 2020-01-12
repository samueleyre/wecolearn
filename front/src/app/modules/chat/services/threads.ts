import { combineLatest, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { User } from '~/core/entities/user/entity';

import { MessagesService } from './messages';


@Injectable()
export class Threads {
  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  public orderedThreads: Observable<Thread[]> = new EmptyObservable();


  // `orderedThreads` contains the newest-first chronological list of threads
  public newThreadsSubject: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);


  // `currentThread` contains the currently selected thread
  currentThread: BehaviorSubject<Thread> =
    new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
    // `threads` is a observable that contains the most up to date list of threads
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[String(message.thread.id)] || message.thread;
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

    // `orderedThreads` contains the newest-first chronological list of threads
    this.orderedThreads.subscribe(
        (currentThreads: Thread[]) => {
          if (!this.currentThread.getValue().id && currentThreads.length > 0) {
            this.currentThread.next(currentThreads[0]);
          }
          this.newThreadsSubject.next(currentThreads);
        },
        error => console.log('error', error),
    );

    // `currentThreadMessages` Observable that contains the set of messages for the currently selected thread
    this.currentThreadMessages = this.currentThread.pipe(
      combineLatest(
        messagesService.messages,
        (currentThread: Thread, messages: Message[]) => {
          if (currentThread && messages.length > 0) {
            return _.chain(messages)
            .filter((message: Message) => {
              return (message.thread.id === currentThread.id);
            })
              // .sortBy(messages, (m: Message) => m.created).reverse()
            .map((message: Message) => {
              if (!message.is_read && message.receiver && message.thread.id !== message.receiver.id) {
                message.is_read = true;
                this.messagesService.addMessageToUpdate(message);
              }
              return message;
            })
            .value();
          }
          if (currentThread) {
            return [new Message(
              { message: 'Prenez contact avec votre première relation !',
                thread: currentThread,
                senderId: currentThread.id },
              )];
          }
          return [];
        }));

    // when currently selected front is selected, mark all the messages that it contains as read
    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    if (!this.currentThread.getValue().id) {
      this.messagesService.addMessage(
        new Message(
          { message: 'Prenez contact avec votre première relation !' ,
            thread: newThread,
            senderId: newThread.id }),
      );
    } else if (!newThread.lastMessage) {
      this.messagesService.addMessage(new Message({ message: '' , thread: newThread, senderId: newThread.id }));
    }
    this.currentThread.next(newThread);
  }

  resetThreads(): void {
    this.orderedThreads = new EmptyObservable();
    this.newThreadsSubject = new BehaviorSubject<Thread[]>([]);
    this.messagesService.currentClient = new User();
  }
}

