import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { UserFormComponent } from '~/modules/users/modules/user-ui/components/user-form/user-form.component';
import { AuthenticationService } from '~/core/services/auth/auth.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { CommunityAdminUsersService } from '~/core/services/communityAdmin/admin-users.service';
import { ToastService } from '~/core/services/toast.service';

@Component({
  selector: 'app-admin-community-users',
  templateUrl: './admin-community-users.component.html',
  styleUrls: ['./admin-community-users.component.scss'],
})
export class AdminCommunityUsersComponent extends DestroyObservable implements OnInit {
  usersToShow: User[];
  users$: BehaviorSubject<User[]> = new BehaviorSubject(null);
  usersFiltered: User[];

  searchFilters: FormGroup;
  editUserFormVisible = false;
  isCreatingUser = false;
  PAGE_SIZE = 10;

  @ViewChild(UserFormComponent, { static: false }) userForm: UserFormComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public editedUser: User;

  constructor(
    public authenticationService: AuthenticationService,
    private _userService: CommunityAdminUsersService,
    private _toastr: ToastService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to user list
    this._userService.users$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
      this.users$.next(users.filter(user => user.deleted === null));
    });
    this.loadUsers();
    this.initSearchForm();
  }

  ngAfterViewInit() {
    merge(
      this.users$,
      this.searchFilters.valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.paginator.pageIndex = 0)),
      ),
      this.paginator.page,
    )
      .pipe(
        filter(() => !!this.users), // skip if users is not defined yet
        distinctUntilChanged(),
        switchMap(() => {
          this.closeUserForm();
          const query = this.searchFilters ? this.searchFilters.controls.query.value : '';
          const page = this.paginator.pageIndex;
          const start = Number(page) * this.PAGE_SIZE;
          const end = Number(page) * this.PAGE_SIZE + this.PAGE_SIZE;
          this.usersFiltered = this.users.filter(
            u => `${u.email} ${u.first_name} ${u.last_name} ${u.tags.map(tag => tag.name)
              .join()}`.toLowerCase().includes(query.toLowerCase()),
          );
          return of(this.usersFiltered.slice(start, end));
        }),
      )
      .subscribe((filteredUsers) => {
        this.usersToShow = filteredUsers;
      });
  }

  get users() {
    return this.users$.value;
  }

  get loaded(): boolean {
    return !!this.users;
  }

  get countUsers(): number {
    return this.usersFiltered && this.usersFiltered.length;
  }

  showEditForm(user: User = null) {
    const newUser = new User({
      first_name: null,
      last_name: null,
      email: null,
      roles: [],
      domains: [],
    });
    this.editedUser =
      user === null
        ? newUser
        : user;

    this.isCreatingUser = !this.editedUser.id;
    this.editUserFormVisible = true;
  }

  closeUserForm() {
    this.editUserFormVisible = false;
  }

  private errM(err) {
    console.log(err);
    if (err.status === 409) {
      this._toastr.error('Ce compte est déjà associé');
    }
    if (err.status === 404) {
      this._toastr.error("Cette adresse mail n'est pas présente sur la plateforme");
    }
  }

  createUser(params) {
    this._userService.createAndList(params).subscribe(
      (data) => {
        const user = this._userService.user;
        this.closeUserForm();
        this._toastr.success(
          `Un email a été envoyé à ${params.email}`,
          `L'utilisateur ${user.first_name} ${user.last_name} a été ajouté`,
        );
      },
      err => this.errM(err),
    );
  }

  updateUser(params) {
    this._userService.putAndList({ ...params, id: this.editedUser.id }).subscribe(
      (data) => {
        this.closeUserForm();
        this._toastr.success(`Les informations ont bien été modifiées`);
      },
      err => this.errM(err),
    );
  }

  private loadUsers() {
    this._userService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this.fb.group({
      query: [''],
    });
  }

  deleteUser(user) {
    this._userService
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
}
