import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

import { Store } from 'src/store';
import { Meal } from './meals.service';
import { Workout } from './workouts.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<ScheduleItem[]> = this.date$
    .pipe(
      tap((next: any) => this.store.set('date', next)),
      map((day: any) => {
        const startAt = (
          new Date(day.getFullYear(), day.getMonth(), day.getDate())
        ).getTime();

        const endAt = (
          new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
        ).getTime() - 1;

        return { startAt, endAt };
      }),
      switchMap(x => this.getSchedule(x.startAt, x.endAt)),
      map((data: any) => {

        const mapped: ScheduleList = {};

        for (const prop of data) {
          if (!mapped[prop.section]) {
            mapped[prop.section] = prop;
          }
        }

        return mapped;

      }),
      tap((next: any) => this.store.set('schedule', next))
    );

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) { }

  get uid() {
    return this.authService.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list<ScheduleList>(`schedule/${this.uid}`,
      ref => ref.orderByChild('timestamp')
        .startAt(startAt)
        .endAt(endAt)
    ).valueChanges();
  }
}
