import { IEntity }	from './../../entity/interface';
import { Entity }	from './../../entity/entity';

export class Programmation extends Entity implements IEntity  {

	public id: number|null;
	public name: string;
	public idLanguage : number;
	public idBlog: number;
	public idClient: number;
	public idPhraseClef : number;
	public isBlank : number;
	public isException : number;
	public used : number;
	public blogPageId : number|null;
	public time: string|null;
	
}