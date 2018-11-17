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

    ];


    this.communities.push({
      title: "La Myne",
      description:  "La MYNE est un laboratoire de recherche pour les citoyen.ne.s qui expérimentent le futur. Nous agissons en Tier(s)-Lieu(x) par les Communs.",
      subDomain: "lamyne"
    });



  }

  ngOnInit() {
  }


}