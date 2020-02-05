import { Component } from '@angular/core';

import { SOCIALS } from '~/shared/modules/footer/config/socials';
import { NAV } from '~/config/navigation/nav';


@Component({
  selector: 'main-footer',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainFooterComponent {
  faceBookLink = SOCIALS.faceBookLink;
  twitterLink = SOCIALS.twitterLink;
  telegramLink = SOCIALS.telegramLink;
  meetupLink = SOCIALS.meetupLink;

  peerLearningLink = NAV.peerLearning;
  aboutLink = NAV.about;
  homeLink = NAV.home;
  mentionLegalesLink = NAV.mentionsLegales;

  now = new Date();
}
