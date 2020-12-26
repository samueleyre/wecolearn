import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, merge, Observable, of, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipUntil, switchMap, takeUntil, tap } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { AuthenticationService } from '~/core/services/auth/auth';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { AdminUsersService } from '~/modules/users/services/admin-users.service';
import { UserFormComponent } from '~/modules/users/modules/user-ui/components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends DestroyObservable implements OnInit {
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
  canEditUser$: Observable<boolean>;

  constructor(
    public authenticationService: AuthenticationService,
    public userService: AdminUsersService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    // listen to user list
    this.userService.users$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
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
            u => `${u.email} ${u.first_name} ${u.city} ${u.last_name} ${u.tags.map(tag => tag.name)
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
    const emptyUser = new User();
    this.editedUser =
      user === null
        ? emptyUser
        : user;

    this.isCreatingUser = !this.editedUser.id;
    this.editUserFormVisible = true;
  }

  closeUserForm() {
    this.editUserFormVisible = false;
  }

  private loadUsers() {
    this.userService.list().subscribe();
  }

  private initSearchForm() {
    this.searchFilters = this.fb.group({
      query: [''],
    });
  }
}
