import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CommunityAdminMessageStatsService } from '~/core/services/communityAdmin/community-admin-message-stats.service';
import { ProfileService } from '~/core/services/user/profile.service';
import { StatsInterface } from '~/core/interfaces/stats/stats.interface';


@Component({
  selector: 'app-admin-community-message-stats',
  templateUrl: './admin-community-message-stats.component.html',
  styleUrls: ['./admin-community-message-stats.component.scss'],
})
export class AdminCommunityMessageStatsComponent implements OnInit {
  constructor(
    private _profileService: ProfileService,
    private _messageStatsService: CommunityAdminMessageStatsService,
  ) {
  }

  ngOnInit() {
    const user = this._profileService.profile;
    this._messageStatsService.get(user.admin_domain.id).subscribe();
  }

  get stats$(): Observable<StatsInterface> {
    return this._messageStatsService.stats();
  }
}
