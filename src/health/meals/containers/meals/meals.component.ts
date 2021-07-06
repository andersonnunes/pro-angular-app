import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Meal, MealsService } from 'src/health/schedule/services/meals.service';
import { Store } from 'src/store';

@Component({
  selector: 'meals',
  template: `
    <div>
      {{ meals$ | async | json }}
    </div>
  `,
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$!: Observable<Meal[]>;
  subscription!: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) { }

  ngOnInit(): void {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
