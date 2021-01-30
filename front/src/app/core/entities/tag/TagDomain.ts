export class TagDomain {
  public id: number;
  public name: string;
  public emoji: string;
  public hexcolor: string;

  constructor(obj?: {
    id?: number,
    name: string,
    emoji: string,
    hexcolor?: string,
  }) {
    if (obj) {
      if ('id' in obj) {
        this.id = obj.id;
      }
      this.name = 'name' in obj ? obj.name : null;
      this.emoji = 'emoji' in obj ? obj.emoji : null;
      this.hexcolor = 'hexcolor' in obj ? obj.hexcolor : null;
    }
  }
}
