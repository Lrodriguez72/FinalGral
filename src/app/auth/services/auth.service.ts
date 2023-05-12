import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  BehaviorSubject,
  map,
  catchError,
  throwError,
  of,
} from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { Appstate } from 'src/app/store';
import {
  EstablecerUsuarioAtenticado,
  QuitarUsuarioAtenticado,
} from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { enviroment } from 'src/environments/environments';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
//interface Usuario en core/models/index.ts
export class AuthService {
  //private authUser$ = new BehaviorSubject<Usuario | null>(null);
  //emite a toda la app cuál es el usuario autenticado

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<Appstate>
  ) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    //return this.authUser$.asObservable();
    //ngRx:
    return this.store.select(selectAuthUser);
  }

  //ngRx
  establecerUsuarioAutenticado(usuario: Usuario, token: string): void {
    //this.authUser$.next(Usuario);
    this.store.dispatch(
      EstablecerUsuarioAtenticado({ payload: { ...usuario, token } })
    );
  }

  login(formValue: LoginFormValue): void {
    //una vez definido el módulo HTTP CLIENT MODULE en app.module.ts
    //puede inyectarse acá:
    this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`, {
        params: {
          ...formValue,
        },
        //la constante apiBaseUrl se almacena en environments.ts y si es necesario de modifica de allí
      })
      .subscribe({
        next: (usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            //almaceno en el localstorage el token del usuario para verificar y mantener sesión
            localStorage.setItem('token', usuarioAutenticado.token);

            //console.log('se almacena token');
            this.establecerUsuarioAutenticado(
              usuarioAutenticado,
              usuarioAutenticado.token
            );
            // this.authUser$.next(usuarioAutenticado);

            // re dirijo el UsuarioAtenticado al Dashboard
            this.router.navigate(['dashboard']);
          } else {
            alert('¡Usuario y contraseña incorrectos!');
          }
        },
      });
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios?token=${token}`, {
        // IMPLEMENTA EL ENVIO DE INFO POR CABECERA
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      })
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            //this.authUser$.next(usuarioAutenticado);
            //ngRx:
            this.establecerUsuarioAutenticado(
              usuarioAutenticado,
              usuarioAutenticado.token
            );
          }
          return !!usuarioAutenticado;
          //!!algo, retorna el booleano
        }),
        //PIPE CATCH ERROR PARA APLICAR A LA PETICION
        catchError((err) => {
          // of genera un observable e inmediatamente devuelve un boolean, es de RxJs
          return of(false);
          //en linea 67 está intentando comunicarse con la API y si no está levantada lo redige a login,
          //sin dar error de token
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    //this.authUser$.next(null);
    this.store.dispatch(QuitarUsuarioAtenticado());
    this.router.navigate(['auth']);
  }
}
