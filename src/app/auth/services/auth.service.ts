import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Usuario } from 'src/app/core/models';
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
  private authUser$ = new BehaviorSubject<Usuario | null>(null);
  //emite a toda la app cuál es el usuario autenticado

  constructor(private router: Router, private httpClient: HttpClient) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
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

            this.authUser$.next(usuarioAutenticado);

            // re dirijo el UsuarioAtenticado al Dashboard
            this.router.navigate(['dashboard']);
          } else {
            alert('¡Usuario y contraseña incorrectos!');
          }
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  //
  //
  //
  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      })
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token);
            this.authUser$.next(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
          //!!algo, retorna el booleano
        }),
        catchError((err) => {
          ///////////////////////
          alert('Error al verificar el token');
          //////////////////////
          return throwError(() => err);
        })
      );
  }
}
