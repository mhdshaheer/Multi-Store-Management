import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.role$.pipe(
    take(1),
    map((role) => {
      if (role === 'ADMIN') {
        return true;
      }

      router.navigate(['/']);
      return false;
    }),
  );
};
