import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from "src/store";

export type User = {
  email: string | null
  uid: string
  authenticated: boolean
}

@Injectable()
export class AuthService {
  _user!: User;

  auth$ = this.af.authState
    .pipe(
      tap(next => {
        if (!next) {
          this.store.set('user', null);
          return;
        }
        const user: User = {
          email: next.email,
          uid: next.uid,
          authenticated: true
        };
        this.store.set('user', user);
        this._user = user;
      })
    );

  constructor(
    private store: Store,
    private af: AngularFireAuth) { }

  get user() {
    return this._user;
  }

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.signOut();
  }
}
