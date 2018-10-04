import {Component, OnInit} from '@angular/core';
import {DomainService} from "../../../service/domain";

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class CommunitiesComponent implements OnInit {

  private communities: Array<object>;

  constructor() {
    this.communities = [
      {
        title: "Les Bricodeurs",
        description:  "Collectif du numérique citoyen",
        subDomain: "lesbricodeurs"
      }
    ]

  }

  ngOnInit() {
  }


}