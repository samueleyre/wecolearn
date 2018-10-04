import {Component, OnInit, Input} from '@angular/core';
import {GPPDComponent} from "../../../../component/gppd";

@Component({
    selector: 'community',
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class CommunityComponent implements OnInit {

  private webPath: string;
  private logoPath: string;
  @Input() community: object;

  constructor( ) {}

  ngOnInit() {
    this.webPath = GPPDComponent.updateUrl('/');
    this.logoPath = this.webPath+'logo/'+this.community['subDomain']+".png";
  }


}