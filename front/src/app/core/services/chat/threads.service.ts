import { filter, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';

import { Thread } from '~/core/entities/thread/entity';
import { Message } from '~/core/entities/message/entity';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { ProfileService } from '~/core/services/user/profile.service';
import { CurrentThreadService } from '~/core/services/chat/currentThread.service';

import { MessagesService } from './messages.service';


@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  constructor(public messagesService: MessagesService, private _profileService: ProfileService) {
    this.initThreadsConstructor();

    this.initCurrentThreadsConstuctor();

    CurrentThreadService.currentThread.subscribe((thread) => {
      // mark all the messages that it contains as read
      this.messagesService.markThreadAsRead.next(thread);

      // set current chating user
      MenuMobileService.discussingUser.next(thread.name);
    });
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
          if (!message.is_read && message.sender.id !== this._profileService.profile.id) {
            threadGroups[message.thread.id].countNotRead += 1;
          }
        });

        // from object to ordered list
        const threads: Thread[] = _.values(threadGroups);

        // order thread
        const sortedThreads = _.sortBy(threads, (t: Thread) => new Date(t.lastMessage.created)).reverse();

        // select latest thread
        if (!CurrentThreadService.currentThread.getValue().id && sortedThreads.length > 0) {
          CurrentThreadService.currentThread.next(sortedThreads[0]);
        }

        this.orderedThreads$.next(sortedThreads);
        return sortedThreads;
      }));
  }

  private initCurrentThreadsConstuctor() {
    // `currentThreadMessages` Observable that contains the set of messages for the currently selected thread
    this.currentThreadMessages = combineLatest(CurrentThreadService.currentThread, this.messagesService.messages)
      .pipe(
        map(([currentThread, messages]) => {
          if (currentThread && messages.length > 0) {
            return _.chain(messages)
              .filter((message: Message) => {
                return (message.thread.id === currentThread.id);
              })
              .value();
          }
          return [];
        }));
  }

  private threadExists(threadId): boolean {
    return !!this.orderedThreads$.getValue().find(thread => thread.id === threadId);
  }

  // `orderedThreads` contains a newest-first chronological list of threads
  public orderedThreads: Observable<Thread[]>;

  public orderedThreads$: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  public setThreadById(id: number): void {
    this.orderedThreads.pipe(filter(ths => ths.length > 0), take(4)).subscribe((ths) => {
      const thread = ths.filter(th => th.id === id)[0];
      if (thread) {
        this.setCurrentThread(thread);
      }
    },
    );
  }

  setCurrentThread(thread: Thread): void {
    // new thread
    if (!this.threadExists(thread.id)) {
      this.messagesService.addMessage(new Message({ thread, id: -1, message: '' , sender: { id: -1 }, is_read: true }));
    }

    CurrentThreadService.currentThread.next(thread);
  }

  reset(): void {
    this.orderedThreads$.next([]);
    CurrentThreadService.currentThread.next(new Thread());
  }
}

