import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Meal, MealsService } from 'src/health/schedule/services/meals.service';

@Component({
  selector: 'meal',
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/food.svg">
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"></meal-form>
      </div>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  constructor(
    private mealsService: MealsService,
    private router: Router
  ) { }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
