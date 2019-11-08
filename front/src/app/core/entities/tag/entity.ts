export class Tag {
  public id: number | null;
  public name: string;
  public type: number;
  public iteration: number;


  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : null;
    this.name = obj && obj.name ? obj.name : null;
    this.type = obj && obj.type ? obj.type : null;
    this.iteration = obj && obj.iteration ? obj.iteration : null;
  }
}
