import {Component, OnInit, Input} from '@angular/core';
import {GPPDComponent} from "../../../../component/gppd";
import {DomainService} from "../../../../service/domain";
import {Community} from "../../../../entities/community/entity";
import {Router} from "@angular/router";

@Component({
    selector: 'community',
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class CommunityComponent implements OnInit {

  private webPath: string;
  private logoPath: string;
  private link: string;
  private environment : string;
  @Input() community: Community;

  constructor(         private domainService: DomainService,
                       private router: Router,
  ) {
    this.environment = process.env.NODE_ENV;
  }

  ngOnInit() {
    this.webPath = GPPDComponent.updateUrl('/');
    this.logoPath = this.webPath+'logo/'+this.community['subDomain']+".png";
    this.link = "https://"+this.community.subDomain+".wecolearn.com";
  }


  setDevSubdomain(e:any) {


    if (process.env.NODE_ENV !== 'production') {
      this.domainService.setDevSubDomain(this.community.subDomain);
      this.router.navigate(['/']);
    }

  }



}