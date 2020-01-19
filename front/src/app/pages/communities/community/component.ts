import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DomainService } from '~/core/services/domain';
import { Community } from '~/core/entities/community/entity';
import { environment } from '~/../environments/environment';
import { UrlService } from '~/core/services/url';

@Component({
  selector: 'community',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class CommunityComponent implements OnInit {
  private webPath: string;
  public logoPath: string;
  public link: string;
  public production: boolean;
  @Input() community: Community;

  constructor(private domainService: DomainService,
              private router: Router,
  ) {
    this.production = environment.production;
  }

  ngOnInit() {
    this.webPath = UrlService.updateUrl('/');
    this.logoPath = `${this.webPath}logo/${this.community['subDomain']}.png`;
    this.link = `https://${this.community.subDomain}.wecolearn.com`;
  }


  setDevSubdomain(e: any) {
    if (!environment.production) {
      this.domainService.setDevSubDomain(this.community.subDomain);
      this.router.navigate(['/']);
    }
  }
}
