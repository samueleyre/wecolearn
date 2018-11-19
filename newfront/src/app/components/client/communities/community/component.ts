import {Component, OnInit, Input} from '@angular/core';
import {GPPDComponent} from "../../../component/gppd";
import {DomainService} from "../../../../service/domain";
import {Community} from "../../../../entities/community/entity";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'community',
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class CommunityComponent implements OnInit {

  private webPath: string;
  private logoPath: string;
  private link: string;
  private production : boolean;
  @Input() community: Community;

  constructor(         private domainService: DomainService,
                       private router: Router,
  ) {
    this.production = environment.production;
  }

  ngOnInit() {
    this.webPath = GPPDComponent.updateUrl('/');
    this.logoPath = this.webPath+'logo/'+this.community['subDomain']+".png";
    this.link = "https://"+this.community.subDomain+".wecolearn.com";
  }


  setDevSubdomain(e:any) {


    if (false === environment.production) {
      this.domainService.setDevSubDomain(this.community.subDomain);
      this.router.navigate(['/']);
    }

  }



}