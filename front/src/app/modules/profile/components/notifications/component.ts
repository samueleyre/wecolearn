import {
  Component,
  OnInit,
  Injectable,
} from '@angular/core';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/user/client';
import { ToastService } from '~/core/services/toast.service';


@Component({
  selector: 'emailNotificationSettings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class EmailNotificationSettingsComponent implements OnInit {
  public user;

  constructor(private clientService: ClientService, private toastr: ToastService) {
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
            this.toastr.success('Modification prise en compte');
          },
          (error) => {
            console.log(error);
          },
      );
      },
      0);
  }
}
