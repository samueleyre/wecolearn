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


<<<<<<< HEAD:front/src/app/components/client/communities/component.ts
      this.communities.push({
        title: 'La Myne',
        description:  'La MYNE est un laboratoire de recherche pour les citoyen.ne.s qui expérimentent le futur. Nous agissons en Tier(s)-Lieu(x) par les Communs.',
        subDomain: 'lamyne'
      });
=======
    this.communities.push({
      title: "La Myne",
      description:  "La MYNE est un laboratoire de recherche pour les citoyen.ne.s qui expérimentent le futur. Nous agissons en Tier(s)-Lieu(x) par les Communs.",
      subDomain: "lamyne"
    });
>>>>>>> d37b13170507e6c1336652ce3bff27a25e1fc6b5:front/src/app/wc/components/client/communities/component.ts



  }

  ngOnInit() {
  }


}
