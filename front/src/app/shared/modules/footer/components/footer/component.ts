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
  blogLink = SOCIALS.blogLink;

  peerLearningLink = NAV.peerLearning;
  aboutLink = NAV.aboutUs;
  homeLink = NAV.home;
  mentionLegalesLink = NAV.mentionsLegales;
  manifestLink = NAV.manifest;

  now = new Date();
}
