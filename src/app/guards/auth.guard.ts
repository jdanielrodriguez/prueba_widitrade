import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Sesion } from './../common/sesion';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sesion: Sesion, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.sesion.actualizaPerfil();
    const door = this.sesion.validarSesion();
    if (!door) {
      this.router.navigate([`./inicio`]);
    }
    return door;
  }
}
