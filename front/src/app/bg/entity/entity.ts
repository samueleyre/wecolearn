	export class Entity {

	public serialize(): object {
		let ret  = {};
		Object.getOwnPropertyNames(this).forEach(name => {
            ret[name] = this[name];
        });
      	return ret;
	}

	public set( entityObject : any ) {
		for( let name in entityObject ) {
			this[name] = entityObject[name];
		}
	}
}