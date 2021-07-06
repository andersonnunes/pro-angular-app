import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

import { User } from "./auth/shared/services/auth/auth.service";

export type State = {
  user: User | null
  [key: string]: any
}

const state: State = {
  user: null
};

export class Store {
  private subject = new BehaviorSubject(state);
  private store = this.subject.asObservable()
    .pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  };
}
