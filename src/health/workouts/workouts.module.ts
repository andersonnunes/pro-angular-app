import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';

// components
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent },
];

@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutFormComponent,
    WorkoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class WorkoutsModule { }
