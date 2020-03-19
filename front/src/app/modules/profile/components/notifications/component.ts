import {
  Component,
  OnInit,
  Injectable,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/user/client';


@Component({
  selector: 'emailNotificationSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class EmailNotificationSettingsComponent implements OnInit {
  public user;

  constructor(private clientService: ClientService, private toastr: ToastrService) {
    this.user = new User();
  }


  ngOnInit() {
    this.load();
  }

  load(): void {
    this.clientService.get().subscribe((client: User) => {
      this.user = client;
    });
  }

  submit() {
    setTimeout(
      () => {
        this.clientService.patch(this.user).subscribe(
          (entity: User) => {
            this.toastr.success('Modification prise en compte !');
          },
          (error) => {
            console.log(error);
          },
      );
      },
      0);
  }
}
