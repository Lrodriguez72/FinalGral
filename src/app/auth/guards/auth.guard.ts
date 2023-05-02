import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
// objetivo: proteger todas las rutas dentro del dashboard
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  //canActivate: recibe una referencia a la ruta a la que se intenta ingresar
  // es un método que debe retornar un observable booleano o una UrlTree o un booleano
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //para obtenerlo,  lo paso por el pipe:
    return this.authService.verificarToken().pipe(
      map((usuarioAutenticado) => {
        if (!usuarioAutenticado) {
          return this.router.createUrlTree(['auth', 'login']);
        } else {
          // si el usuario está autenticado lo dejo seguir hacia esa dirección
          return true;
        }
      })
    );
  }
}
