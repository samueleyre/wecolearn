// tslint:disable variable-name


import { SlackTeam } from '../slackTeam/entity';

export class SlackAccount {
  public id: number | null;
  public name: string | null;
  public account_id: string;
  public slack_team: SlackTeam;

  constructor(id?: number, name?: string, account_id?: string, slack_team?: SlackTeam) {
    this.id = id || null;
    this.name = name || null;
    this.account_id = account_id || null;
    this.slack_team = slack_team || new SlackTeam();
  }
}
