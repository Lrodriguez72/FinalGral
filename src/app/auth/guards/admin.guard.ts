import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //obtengo el usuario autenticado para conocer sus propiedades
    // y en el map verifico su rol
    // (la interface de Usuario se encuentra en Index.ts)
    return this.authService.obtenerUsuarioAutenticado().pipe(
      map((usuarioAutenticado) => {
        if (usuarioAutenticado?.role !== 'admin') {
          alert('Usted no tiene permiso');
          return false;
        } else {
          return true;
        }
      })
    );
    // return true;
  }
}
