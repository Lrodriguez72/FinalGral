import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Usuario } from 'src/app/core/models';

export const USUARIOS_MOCKS: Usuario[] = [
  {
    id: 7,
    nombre: 'Pablo',
    apellido: 'García',
    email: 'pablo@email.com',
    password: '123456',
    token: 'nmdsgfjhuMDKSAFJASDK327SJDKANjsadnsah',
    role: 'user',
  },
  {
    nombre: 'Lorena',
    apellido: 'Rodriguez',
    email: 'lorena@email.com',
    password: '123456',
    token: 'LLL123RRR',
    role: 'admin',
    id: 4,
  },
  {
    nombre: 'Josue',
    apellido: 'Baez',
    email: 'josue@mail.com',
    password: '676767',
    token: '12gg345tt343fdfdfsfsfsf',
    role: 'admin',
    id: 8,
  },
];
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  // BehaviourSubject
  private usuarios$ = new BehaviorSubject<Usuario[]>(USUARIOS_MOCKS);

  constructor() {}

  obtenerUsuarios(): Observable<Usuario[]> {
    this.usuarios$.next(USUARIOS_MOCKS);
    return this.usuarios$.asObservable();
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario | undefined> {
    return this.usuarios$
      .asObservable()
      .pipe(map((usuarios) => usuarios.find((a) => a.id === id)));
  }
}
