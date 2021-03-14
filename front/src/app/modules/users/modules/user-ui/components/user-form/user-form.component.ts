import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '~/core/entities/user/entity';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';
import { USER_ROLES, USER_ROLES_FR, UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { PATTERN } from '~/shared/config/pattern';
import { ToastService } from '~/core/services/toast.service';
import { EnvEnum } from '~/core/enums/env.enum';
import { AdminCommunityService } from '~/core/services/admin/admin-community.service';

import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends DestroyObservable implements OnInit {
  @Input() user: User;
  @Input() fields: (keyof User)[] = ['first_name', 'last_name', 'email', 'roles', 'domains'];
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() createUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();

  createEditUserForm: FormGroup;

  public roles = USER_ROLES;

  constructor(
    private _fb: FormBuilder,
    private _userService: AdminUsersService,
    private _toastr: ToastService,
    private _communityService: AdminCommunityService,
  ) {
    super();
    this.loadCommunities();
  }

  get communities$() {
    return this._communityService.communities$;
  }

  private loadCommunities() {
    this._communityService.list().subscribe();
  }

  updateFormValues() {
    const user: User = this.user;
    this.updateValidators();
    if (this.createEditUserForm) {
      const baseValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roles: user.roles.length > 0 ? user.roles : [[UserRoleEnum.USER]],
        domains: user.domains,
      };

      const values = this.fields.reduce(
        (selectValues, field) => {
          return {
            ...selectValues,
            [field]: baseValues[field],
          };
        },
        {});

      this.createEditUserForm.setValue(values);

      Object.keys(this.createEditUserForm.controls).forEach((key) => {
        this.createEditUserForm.controls[key].setErrors(null);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCreating']) {
      this.updateValidators();
    }

    if (changes['user']) {
      this.updateFormValues();
    }
  }

  ngOnInit() {
    if (!this.user) {
      this.user = new User(
        {
          first_name: null,
          last_name: null,
          email: null,
          roles: [],
          domains: [],
        },
      );
    }
    this.initForm();
  }

  get controls() {
    return this.createEditUserForm.controls;
  }

  public onUpdateUser(): void {
    const formVal = { ...this.createEditUserForm.value };

    for (const field in this.fields) {
      if (!(field in formVal)) {
        delete formVal[field];
      }
    }

    if (this.isCreating) {
      this.createUser.emit(formVal);
    } else {
      this.updateUser.emit(formVal);
    }
  }

  updateValidators(isCreating: boolean = this.isCreating) {
    //   no validators to update
  }

  public getFrenchRole(role: UserRoleEnum): string {
    return USER_ROLES_FR[role];
  }

  private initForm(
    user: User = this.user,
  ): void {
    const pattern = (environment.env === EnvEnum.PRODUCTION) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
    const baseConfig = {
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, [Validators.required, Validators.pattern(pattern)]],
      roles: user.roles && user.roles.length > 0 ? user.roles : [[UserRoleEnum.USER]],
      domains: [user.domains, Validators.required],
    };

    const config = this.fields.reduce(
      (customConfig, field) => {
        return {
          ...customConfig,
          [field]: baseConfig[field],
        };
      },
      {});

    this.createEditUserForm = this._fb.group(config);
  }

  compareIds(tagOption: { id: number }, tagSelection: { id: number }): boolean {
    return tagOption && tagSelection ? tagOption.id === tagSelection.id : tagOption === tagSelection;
  }

  compareRoles(rolesOption: UserRoleEnum[], rolesSelection: UserRoleEnum[]): boolean {
    return rolesOption && rolesSelection ? rolesOption[0] === rolesSelection[0] : rolesOption === rolesSelection;
  }
}

