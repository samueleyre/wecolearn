export class TagDomain {
  public id: number;
  public name: string;
  public emoji: string;

  constructor(obj: {
    id: number,
    name: string,
    emoji: string,
  }) {
    this.name = obj.name;
    this.emoji = obj.emoji;
    this.id = obj.id;
  }
}
