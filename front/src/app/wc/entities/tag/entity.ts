import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Tag extends Entity implements IEntity  {

    public id: 		number|null;
    public name : 	string;
    public type : 	number;



    constructor(id:number = null, name = '', type:number = null) {
        super();
        this.id = id;
        this.name = name;
        this.type = type;

    }
}