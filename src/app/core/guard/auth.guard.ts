import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = 
(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const _router = inject(Router);
  const _auth = inject(AuthService);

  if(_auth.authorized()) {
      return true;
  } else {
    return _router.createUrlTree(['/auth/register'])
  }

};
