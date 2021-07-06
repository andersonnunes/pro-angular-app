import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Meal, MealsService } from 'src/health/schedule/services/meals.service';
import { Store } from 'src/store';

@Component({
  selector: 'meals',
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="assets/food.svg">
          Your meals
        </h1>
        <a class="btn__add" [routerLink]="['../meals/new']">
          <img src="assets/add-white.svg">
          New meal
        </a>
      </div>
      <div *ngIf="meals$ | async as meals; else loading;">
        <div class="message" *ngIf="!meals.length">
          <img src="assets/face.svg">
          No meals, add a new meal to start
        </div>
        <!-- meals ngFor -->
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/loading.svg">
          Fetching meals...
        </div>
      </ng-template>
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
