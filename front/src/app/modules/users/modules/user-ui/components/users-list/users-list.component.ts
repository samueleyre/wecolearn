import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { USER_ROLES_FR, UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { DialogService } from '~/core/services/dialog.service';
import { User } from '~/core/entities/user/entity';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends DestroyObservable implements OnInit, AfterViewInit {
  @Input() users: User[] = [];
  @Input() canEditUser = false;
  @Output() editUser = new EventEmitter<User>();

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    public userService: AdminUsersService,
    private _toastr: ToastrService,
    private dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onDelete(user: User) {
    this.dialogService
      .confirm('Utilisateurs', 'Voulez-vous supprimer cet utilisateur ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.userService
            .deleteAndList(user.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this._toastr.success(`L'utilisateur ${user.first_name} ${user.last_name} a été supprimé`);
              },
              (err) => {
                this._toastr.error(err.message);
              },
            );
        }
      });
  }

  public getFrenchRoles(roles: UserRoleEnum[]): string {
    if (roles.length === 0) return USER_ROLES_FR[UserRoleEnum.USER];
    return roles.reduce((acc, current) => `${acc} ${USER_ROLES_FR[current]}`, '');
  }

  public onEdit(user: User) {
    this.editUser.emit(user);
  }
}
