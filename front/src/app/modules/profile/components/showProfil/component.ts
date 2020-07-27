import {
  Component,
  OnInit,
  Injectable,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/user/client';
import { Tag } from '~/core/entities/tag/entity';


@Component({
  selector: 'showProfilSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ShowProfilSettingsComponent implements OnInit {
  public user: User;
  public disabled = true;
  public profilDisableInformation = 'Pour pouvoir rendre visible votre profil ' +
    "vous devez remplir votre biographie et ajouter un domaine d'apprentissage";


  constructor(private clientService: ClientService,
              private _toastr: ToastrService,
              private _deviceService: DeviceDetectorService,
  ) {
    this.user = new User();
  }


  ngOnInit() {
    this.load();
  }

  load(): void {
    this.clientService.get().subscribe((client: User) => {
      this.user = client;
      this.disabled = !(!!client.first_name && !!client.biographie && !!client.tags.filter((tag:Tag) => tag.type === 0)[0]);
    });
  }

  get isMobile() {
    return this._deviceService.isMobile();
  }

  submit() {
    setTimeout(
      () => {
        this.clientService.patch(this.user).subscribe(
          (entity: User) => {
            this._toastr.success('Modification prise en compte');
          },
          (error) => {
            console.log(error);
          },
      );
      },
      0);
  }
}
