import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Sesion } from './../common/sesion';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private sesion: Sesion, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const door = this.sesion.validarSesion();
    if (door) {
      this.router.navigate(['./../dashboard/inicio']);
    }
    return door;
  }
}
