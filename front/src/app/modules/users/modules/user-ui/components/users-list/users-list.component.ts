import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { USER_ROLES_FR, UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { DialogService } from '~/core/services/dialog.service';
import { User } from '~/core/entities/user/entity';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { ToastService } from '~/core/services/toast.service';
import {NAV} from '~/config/navigation/nav';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends DestroyObservable implements OnInit, AfterViewInit {
  @Input() users: User[] = [];
  @Input() canEditUser = false;
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  displayedColumns: string[] = ['name', 'email', 'role', 'domains', 'tags', 'city', 'actions'];

  constructor(
    private _toastr: ToastService,
    private dialogService: DialogService,
  ) {
    super();
  }

  ngOnInit() {}

  get profilePublicLink() {
    return NAV.profilePublic;
  }

  ngAfterViewInit() {}

  onDelete(user: User) {
    this.dialogService
      .confirm('Utilisateurs', 'Voulez-vous supprimer cet utilisateur ?')
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.deleteUser.emit(user);
        }
      });
  }

  getDomains(user: User): string {
    if (!user.domains || user.domains.length === 0) {
      console.error('No user domain defined !', user);
      return 'Pas de domaine associé à cet utilisateur';
    }
    return user.domains.map(domain => domain.name).join();
  }

  getTags(user: User, type: TagTypeEnum): string {
    return user.tags.filter(tag => tag.type === type).map(tag => tag.name).join(', ');
  }

  public getFrenchRoles(roles: UserRoleEnum[]): string {
    if (roles.length === 0) return USER_ROLES_FR[UserRoleEnum.USER];
    return roles.reduce((acc, current) => `${acc} ${USER_ROLES_FR[current]}`, '');
  }

  public onEdit(user: User) {
    this.editUser.emit(user);
  }
}
