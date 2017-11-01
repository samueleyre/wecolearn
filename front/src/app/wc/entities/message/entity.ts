import { Client } from '../client/entity';
import { Thread } from '../thread/entity';
import {IEntity} from "../../entity/interface";
import {Entity} from "../../entity/entity";

/**
 * Message represents one message being sent in a Thread
 */
export class Message extends Entity implements IEntity  {


    id: number;
    sentAt: Date;
    isRead: boolean;
    author: Client;
    text: string;
    thread: Thread;

    constructor(obj?: any) {
        super();
        this.id              = obj && obj.id              || null;
        this.isRead          = obj && obj.isRead          || false;
        this.sentAt          = obj && obj.sentAt          || new Date();
        this.author          = obj && obj.author          || null;
        this.text            = obj && obj.text            || null;
        this.thread          = obj && obj.thread          || null;
    }


}
