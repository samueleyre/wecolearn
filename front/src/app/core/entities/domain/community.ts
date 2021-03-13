export class Community {
  public id: number | null;
  public name: string;
  public count?: number;


  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : null;
    this.name = obj && obj.name ? obj.name : null;
    this.count = obj && obj.count ? obj.count : null;
  }
}
