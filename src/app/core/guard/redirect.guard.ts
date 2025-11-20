import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token");
  const authToken = localStorage.getItem("authToken");
  const _router = inject(Router);

  if (token || authToken) {
    _router.navigate(['/user/home']); // redirect to home or dashboard
    return false;
  }

  return true; // allow access if not logged in

};
