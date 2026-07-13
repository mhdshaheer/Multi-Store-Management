import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otp: string[] = ['', '', '', '', '', ''];

  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

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

    if (otp === '123456') {
      this.showNotification('OTP verified successfully.', 'success');
    } else {
      this.showNotification('Invalid OTP. Please try again.', 'error');
    }
  }

  resendOTP() {
    this.otp = ['', '', '', '', '', ''];

    document.querySelectorAll('input').forEach((input: any) => (input.value = ''));

    (document.getElementById('otp-0') as HTMLInputElement)?.focus();

    this.showNotification('OTP has been resent.', 'success');
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
