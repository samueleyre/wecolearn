import { Client } from '../client/entity';
import { Thread } from '../thread/entity';
import {IEntity} from "../../entity/interface";
import {Entity} from "../../entity/entity";

/**
 * Message represents one message being sent in a Thread
 */
export class Message extends Entity implements IEntity  {


    id: number;
    created: Date;
    isRead: boolean;
    sender: Client;
    message: string;
    receiver : Client;
    thread: Thread;

    constructor(obj?: any) {
        super();
        this.id              = obj && obj.id              || null;
        this.isRead          = obj && obj.isRead          || false;
        this.created       = obj && obj.created          || new Date();
        this.sender          = obj && obj.sender          || null;
        this.message          = obj && obj.message            || null;
        this.receiver        = obj && obj.receiver        || null;
        this.thread          = obj && obj.thread          || null;
    }


}
