/* tslint:disable:max-line-length */

import { Client } from '../../../../entities/client/entity';
import { MessagesService } from './../../../../service/messages';
import { ClientService } from './../../../../service/client';
import { ThreadsService } from './../../../../service/threads.service';
import { Thread } from '../../../../entities/thread/entity';
import { Message } from '../../../../entities/message/entity';





import * as moment from 'moment';

// the person using the app us Juliet
const me: Client      = new Client();
const ladycap: Client = new Client();
const echo: Client    = new Client();
const rev: Client     = new Client();
const wait: Client    = new Client();

const tLadycap: Thread = new Thread(45, ladycap.first_name, ladycap.avatarSrc);
const tEcho: Thread    = new Thread(46, echo.first_name, echo.avatarSrc);
const tRev: Thread     = new Thread(47, rev.first_name, rev.avatarSrc);
const tWait: Thread    = new Thread(48, wait.first_name, wait.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    sender: me,
    createdAt: moment().subtract(45, 'minutes').toDate(),
    message: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    sender: ladycap,
    createdAt: moment().subtract(20, 'minutes').toDate(),
    message: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    sender: echo,
    createdAt: moment().subtract(1, 'minutes').toDate(),
    message: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    sender: rev,
    createdAt: moment().subtract(3, 'minutes').toDate(),
    message: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    sender: wait,
    createdAt: moment().subtract(4, 'minutes').toDate(),
    message: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messagesService: MessagesService,
              threadsService: ThreadsService,
              ClientService: ClientService): void {

    messagesService.messages.subscribe(() => ({}));

    // create the initial messages
    initialMessages.map( (message: Message) => messagesService.addMessage(message) );

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: MessagesService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            sender: echo,
            message: message.message,
            thread: tEcho
          })
        );
      },
                null);


    // reverse bot
    messagesService.messagesForThreadUser(tRev, rev)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            sender: rev,
            message: message.message.split('').reverse().join(''),
            thread: tRev
          })
        );
      },
                null);

    // waiting bot
    messagesService.messagesForThreadUser(tWait, wait)
      .forEach( (message: Message): void => {

        let waitTime: number = parseInt(message.message, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.message}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(
          () => {
            messagesService.addMessage(
              new Message({
                sender: wait,
                message: reply,
                thread: tWait
              })
            );
          },
          waitTime * 1000);
      },
                null);


  }
}
