import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes
          .map(c => ({
            $key: c.key, $exists: c.payload.exists,
            ...c.payload.val() as Workout
          }))
      ),
      tap(next => {
        this.store.set('workouts', next);
      })
    )

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) return of({} as Workout);
    return this.store.select<Workout[]>('workouts')
      .pipe(map(workouts =>
        workouts && workouts.find((workout: Workout) => workout.$key === key)));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }

}
