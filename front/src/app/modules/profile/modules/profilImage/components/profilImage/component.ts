import { Component, Input, Injectable, OnInit, HostListener } from '@angular/core';

import { Image } from '~/core/entities/image/entity';
import { image } from '~/config/image';
import { MenuService } from '~/core/services/layout/menu';
import { UrlService } from '~/core/services/url';
import { WINDOW } from '~/config/window';

@Component({
  selector: 'wc-profil-image',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
@HostListener('window:resize', ['$event'])
export class ProfilImageComponent implements OnInit {
  @Input() image: Image;
  @Input() style = { width: '100%', height: '100%', objectFit: 'cover', transition: 'inherited', marginTop: 'inherited' };
  @Input() menu = false;

  public baseImageName: string = image.default_200px;
  public webImageBase: string;
  public imageUrl;

  constructor(private menuService: MenuService) {
    //
  }


  ngOnInit(): void {
    this.webImageBase = UrlService.updateUrl('/');
    if (this.menu) {
      this.large();
    }
    this.menuService.get().subscribe((on) => {
      if (document.body.clientWidth <= WINDOW.small && this.menu) {
        this.small();
      } else if (on && this.menu) {
        this.small();
      } else if (!on && this.menu) {
        this.large();
      }
    });
  }

  small() {
    this.style = {
      width: '50px', height: '50px', objectFit: 'cover', transition: '.6s', marginTop: '2em',
    };
  }

  large() {
    this.style = {
      width: '180px', height: '180px', objectFit: 'cover', transition: '.6s', marginTop: '2em',
    };
  }

  getUrl(): string {
    let version = '';
    if (this.image.version) {
      version = `v${this.image.version}/`;
    }
    return `https://res.cloudinary.com/wecolearn/image/upload/c_scale,w_324/${version}images/${this.image.public_id}.jpg`;
  }

  onResize(event) {
    if (event.target.innerWidth <= WINDOW.small && this.menu) {
      this.small();
    } else if (this.menu) {
      this.large();
    }
  }
}
