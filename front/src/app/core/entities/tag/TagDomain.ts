export class TagDomain {
  public id: number;
  public name: string;
  public emoji: string;

  constructor(obj?: {
    id: number,
    name: string,
    emoji: string,
  }) {
    this.name = obj && obj.name ? obj.name : null;
    this.emoji = obj && obj.emoji ? obj.emoji : null;
    this.id = obj && obj.id ? obj.id : null;
  }
}
