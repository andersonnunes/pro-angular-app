import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.scss'],
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a [routerLink]="['/auth/login']">Already have an account?</a>
        <button type="submit">
          Create account
        </button>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {
  error: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
  }

}
