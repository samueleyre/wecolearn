// tslint:disable variable-name


export class SlackTeam {
  public id: number | null;
  public name: string | null;
  public team_id: string;
  public type: string;

  constructor(id?: number, name?: string, team_id?: string, type?: string) {
    this.id = id || null;
    this.name = name || null;
    this.team_id = team_id || null;
    this.type = type || null;
  }
}
