import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  declarations: [
    MealsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule { }
