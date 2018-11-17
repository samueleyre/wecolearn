import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

export class CommunitiesComponent implements OnInit {

  private communities: Array<object>;

  constructor() {
    this.communities = [
      {
        title: 'Les Bricodeurs',
        description:  'Collectif du numérique citoyen',
        subDomain: 'lesbricodeurs'
      }

    ];

    if (process.env.NODE_ENV !== 'production') {

      this.communities.push({
        title: 'La Myne',
        description:  'La MYNE est un laboratoire de recherche pour les citoyen.ne.s qui expérimentent le futur. Nous agissons en Tier(s)-Lieu(x) par les Communs.',
        subDomain: 'lamyne'
      });

    }


  }

  ngOnInit() {
  }


}
