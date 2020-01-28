import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';

import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { User } from '~/core/entities/user/entity';

import { MessagesService } from './messages';


@Injectable({
  providedIn: 'root',
})
export class Threads {
  // `orderedThreads` contains a newest-first chronological list of threads
  public orderedThreads: Observable<Thread[]> = of();

  public orderedThreads$: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);

  // `currentThread` contains the currently selected thread
  currentThread: BehaviorSubject<Thread> = new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
    this.initThreadsConstructor();

    this.initCurrentThreadsConstuctor();

    // when currently selected front is selected, mark all the messages that it contains as read
    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }


  private initThreadsConstructor(): void {
    // `threads` is a observable that contains the most up to date list of threads
    this.orderedThreads = this.messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threadGroups: { [key: string]: Thread } = {};

        // Store the message's thread in our accumulator
        messages.map((message: Message) => {
          threadGroups[message.thread.id] = threadGroups[String(message.thread.id)] || { ...message.thread };
          // Cache the most recent message for each thread
          if (
            !threadGroups[message.thread.id].lastMessage
            || threadGroups[message.thread.id].lastMessage.created < message.created
          ) {
            threadGroups[message.thread.id].lastMessage = message;
          }
          // Count number of messages not read in each thread
          if (!message.is_read) {
            threadGroups[message.thread.id].countNotRead += 1;
          }
        });

        // from object to ordered list
        const threads: Thread[] = _.values(threadGroups);

        // order thread
        const sortedThreads = _.sortBy(threads, (t: Thread) => new Date(t.lastMessage.created)).reverse();

        // select latest thread
        if (!this.currentThread.getValue().id && sortedThreads.length > 0) {
          this.currentThread.next(sortedThreads[0]);
        }

        this.orderedThreads$.next(sortedThreads);
        return sortedThreads;
      }));
  }

  private initCurrentThreadsConstuctor() {
    // `currentThreadMessages` Observable that contains the set of messages for the currently selected thread
    this.currentThreadMessages = combineLatest(this.currentThread, this.messagesService.messages)
      .pipe(
        map(([currentThread, messages]) => {
          if (currentThread && messages.length > 0) {
            return _.chain(messages)
              .filter((message: Message) => {
                return (message.thread.id === currentThread.id);
              })
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
    this.orderedThreads = of();
    this.orderedThreads$ = new BehaviorSubject<Thread[]>([]);
    this.messagesService.currentClient = new User();
  }
}

