import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ILogin } from '../../../../core/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  showPassword = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  get f() {
    return this.loginForm.controls;
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);
    const loginData: ILogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this._authService.login(loginData).subscribe({
      next: (res) => {
        console.log(res.message);
        this._authService.setRole(res.data?.role!);
        this._router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
