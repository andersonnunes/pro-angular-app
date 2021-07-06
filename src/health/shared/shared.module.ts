import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// third-paty modules
import { AngularFireDatabaseModule } from '@angular/fire/database';

// services
import { MealsService } from '../schedule/services/meals.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    }
  }
}
