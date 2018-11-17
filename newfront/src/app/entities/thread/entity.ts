import { Message } from '../message/entity';
import {IEntity} from "../../applicativeService/entity/interface";
import {Entity} from "../../applicativeService/entity/entity";

/**
 * Thread represents a group of Users exchanging Messages
 */
export class Thread extends Entity implements IEntity {
    id: number;
    lastMessage: Message;
    name: string;
    avatarSrc: string;

    constructor(id?: number,
                name?: string,
                avatarSrc?: string) {
        super();
        this.id = id || null;
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}
