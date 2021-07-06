import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export type Meal = {
  name: string
  ingredients: string[]
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService implements OnInit {
  meals$!: Observable<Meal[]>;

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.uid
      .then(uid => {
        this.meals$ = this.db.list<Meal>(`meals/${uid}`)
          .valueChanges()
          .pipe(
            tap(next => this.store.set('meals', next))
          );
      })
  }

  ngOnInit(): void {

  }

  get uid() {
    return this.authService.user
      .then(x => x?.uid);
  }
}
