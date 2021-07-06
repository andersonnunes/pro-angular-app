import { Component, OnInit } from '@angular/core';

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
        <meal-form></meal-form>
      </div>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  constructor() { }
}
