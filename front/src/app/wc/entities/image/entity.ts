import { IEntity } from './../../entity/interface';
import { Entity } from './../../entity/entity';
export class Image extends Entity implements IEntity  {

    public id: 		number|null;
    public filename : 	string;
    public file : 	string;



    constructor() {
        super();
        this.id = null;
        this.file = '';
        this.filename = '';

    }
}