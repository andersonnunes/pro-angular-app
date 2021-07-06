import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

import { User } from "./auth/shared/services/auth/auth.service";
import { Meal } from "./health/shared/services/meals.service";
import { Workout } from "./health/shared/services/workouts.service";

export type State = {
  user: User | null
  meals: Meal[]
  workouts: Workout[]
  [key: string]: any
}

const state: State = {
  user: null,
  meals: null,
  workouts: null
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
