import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = localStorage.getItem('token');
  
  // Verificamos si el token existe y si no está expirado
  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;  // Permite el acceso a la ruta
  } else {
    router.navigate(['login']);  // Redirige a la página de login si no está autenticado
    return false;
  }
};
