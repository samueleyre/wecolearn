import {
  Component,
  OnInit,
  Injectable,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/client';
import { Tag } from '~/core/entities/tag/entity';


@Component({
  selector: 'showProfilSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ShowProfilSettingsComponent implements OnInit {
  public user: User;
  public disabled = true;


  constructor(private clientService: ClientService, private _toastr: ToastrService) {
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

  submit() {
    setTimeout(
      () => {
        this.clientService.patch(this.user).subscribe(
          (entity: User) => {
            this._toastr.info('Modification prise en compte !');
          },
          (error) => {
            console.log(error);
          },
      );
      },
      0);
  }
}
