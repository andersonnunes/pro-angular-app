import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export interface Meal {
  name: string
  ingredients: string[]
  timestamp: number
  key: string
  $key: string
  exists: () => boolean
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.key, $exists: c.payload.exists, ...c.payload.val() as Meal }));
      }),
      tap(next => {
        this.store.set('meals', next);
      })
    )

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
