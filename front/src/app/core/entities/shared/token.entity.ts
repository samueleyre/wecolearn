
export class TokenEntity {
  public id: number | null;
  public token: string;
  public type?: number;
  public created?: Date;
  // tslint:disable-next-line:variable-name

  constructor(obj?: any) {
    this.token = obj && obj.token ? obj.token : null;
    if (obj) {
      if ('id' in obj) {
        this.id = obj.id;
      }
      if ('type' in obj) {
        this.type = obj.type;
      }
      if ('created' in obj) {
        this.created = obj.created;
      }

    }
  }
}
