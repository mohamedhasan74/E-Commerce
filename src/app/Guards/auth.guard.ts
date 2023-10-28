import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService = inject(AuthService)
  let _Router = inject(Router)
  if (localStorage.getItem('userToken')) {
    _AuthService.decodeToken();
    return true
  } else {
    _Router.navigate(['/login']);
    return false
  }
};
