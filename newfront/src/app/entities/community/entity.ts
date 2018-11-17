import {IEntity} from "../../applicativeService/entity/interface";
import {Entity} from "../../applicativeService/entity/entity";

/**
 * Message represents one message being sent in a Thread
 */
export class Community extends Entity implements IEntity  {


    id: number;
    title: "";
    description:  "";
    subDomain: "";


    constructor(obj?:  any) {
        super();
        this.id              = obj && obj.id              || null;
        this.title        = obj && obj.title        || "";
        this.description       = obj && obj.description       || "";
        this.subDomain            = obj && obj.subDomain            || "";
    }


}
