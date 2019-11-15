import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User } from '~/core/entities/user/entity';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';
import { USER_ROLES, USER_ROLES_FR, UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { PATTERN } from '~/shared/config/pattern';

import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends DestroyObservable implements OnInit {
  @Input() user: User;
  @Input() isCreating: boolean;
  @Input() groupEditable: boolean;

  @Output() onCloseEditUser: EventEmitter<User> = new EventEmitter<User>();

  createEditUserForm: FormGroup;
  isCreatingUpdating = false;

  public roles = USER_ROLES;

  constructor(private _fb: FormBuilder, private _userService: AdminUsersService, private _toastr: ToastrService) {
    super();
  }

  updateFormValues() {
    const user: User = this.user;

    console.log({ user })

    this.updateValidators();
    if (this.createEditUserForm) {
      this.createEditUserForm.setValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roles: user.roles,
      });

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
      this.user = new User();
    }
    this.initForm();
  }

  get controls() {
    return this.createEditUserForm.controls;
  }

  public onUpdateUser(): void {
    this.isCreatingUpdating = true;

    const formVal = { ...this.createEditUserForm.value };

    if (!this.isCreating) {
      delete formVal.roles;
    }

    const errM = (err) => {
      if (err.status === 409) this._toastr.error('Cette adresse email est déjà utilisée');
      this.isCreatingUpdating = false;
      throw err;
    };

    if (this.isCreating) {
      this._userService.createAndList(formVal).subscribe(
        (data) => {
          const user = data[0];
          this.isCreatingUpdating = false;
          this._toastr.success(
          `Un email a été envoyé à ${user.email}`,
          `L'utilisateur ${user.first_name} ${user.last_name} a été créé`,
        );
          this.onCloseEditUser.emit(user);
        },
        errM);
    } else {
      this._userService.patchAndList({ ...formVal, id: this.user.id }).subscribe(
        (data) => {
          const user = data[0];
          this.isCreatingUpdating = false;
          this._toastr.success(`Les informations ont bien été modifiées`);
          this.onCloseEditUser.emit(user);
        },
        errM);
    }
  }

  updateValidators(isCreating: boolean = this.isCreating) {
    if (this.createEditUserForm) {
      this.createEditUserForm.controls['roles'].setValidators(isCreating ? Validators.required : null);
    }
  }

  public getFrenchRole(role: UserRoleEnum): string {
    return USER_ROLES_FR[role];
  }

  private initForm(
    isCreating: boolean = this.isCreating,
    user: User = this.user,
  ): void {
    const pattern = (environment.production) ? PATTERN.email : PATTERN.emailLocalTestingOnly;
    this.createEditUserForm = this._fb.group({
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, [Validators.required, Validators.pattern(pattern)]],
      roles: [user.roles],
    });

    this.updateValidators(isCreating);

    this.updateFormValues();
  }
}

