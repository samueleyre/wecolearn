import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '~/core/entities/user/entity';

@Injectable({
  providedIn: 'root',
})
export class OnBoardingService {
  private _formTabSelection$ = new BehaviorSubject(0);
  private _userData$ = new BehaviorSubject(null);
  public userForm = this._fb.group({
    first_name: null,
    last_name: null,
    learn_tags: [[]],
    biographie: null,
    latitude: null,
    longitude: null,
    city: null,
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    newsletter: true,
  });
  public communityToken: string = null;

  constructor(
    private _fb: FormBuilder,
  ) {}

  set signUpTab(val: number) {
    this._formTabSelection$.next(val);
  }

  get signUpTab$(): Observable<number> {
    return this._formTabSelection$.asObservable();
  }

  get signUpTabCurrent(): number {
    return this._formTabSelection$.getValue();
  }

  set userData(user: User) {
    this._userData$.next(user);
  }

  get userData$(): Observable<User> {
    return this._userData$.asObservable();
  }
}
