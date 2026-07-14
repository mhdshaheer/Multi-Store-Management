import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otp: string[] = ['', '', '', '', '', ''];
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  userEmail;
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';
  constructor() {
    this.userEmail = this._route.snapshot.queryParamMap.get('email') || '';
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    input.value = input.value.replace(/\D/g, '');

    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }

    this.otp[index] = input.value;

    if (input.value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      next?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value === '' && index > 0) {
      const previous = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;

      previous.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text') || '';

    if (!/^\d{6}$/.test(pastedData)) return;

    pastedData.split('').forEach((digit, index) => {
      this.otp[index] = digit;

      const input = document.getElementById(`otp-${index}`) as HTMLInputElement;

      if (input) {
        input.value = digit;
      }
    });
  }

  verifyOTP() {
    const otp = this.otp.join('');
    this._authService.verifyOtp({ otp, email: this.userEmail }).subscribe({
      next: (res) => {
        console.log(res.message);
        this._router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resendOTP() {
    this._authService.resendOtp(this.userEmail).subscribe({
      next: (res) => {
        console.log(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
