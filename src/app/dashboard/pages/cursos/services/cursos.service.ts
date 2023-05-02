import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, take } from 'rxjs';
import { enviroment } from 'src/environments/environments';
import { CrearCursoPayload } from '../models';
import { Curso } from '../models';
import { tap } from 'rxjs';

export const CURSOS_MOCKS: Curso[] = [
  {
    id: 1,
    nombre: 'Angular',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 2,
    nombre: 'Javascript',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 3,
    nombre: 'Desarrollo Web',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>(CURSOS_MOCKS);

  constructor(private httpClient: HttpClient) {}

  // obtenerCursos(): Observable<Curso[]> {
  //   return this.cursos$.asObservable();
  // }

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${enviroment.apiBaseUrl}/cursos`).pipe(
      tap((cursos) => this.cursos$.next(cursos)),
      mergeMap(() => this.cursos$.asObservable())
    );
  }

  obtenerCursoPorId(id: number): Observable<Curso | undefined> {
    return this.cursos$.pipe(map((Cursos) => Cursos.find((a) => a.id === id)));
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        this.cursos$.next([
          ...cursos,
          {
            id: cursos.length + 1,
            ...payload,
          },
        ]);
      },
      complete: () => {},
      error: () => {},
    });

    // then => next
    // catch => error
    // finally => complete

    return this.cursos$.asObservable();
  }

  editarCurso(
    cursoId: number,
    actualizacion: Partial<Curso>
  ): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.map((curso) => {
          if (curso.id === cursoId) {
            return {
              ...curso,
              ...actualizacion,
            };
          } else {
            return curso;
          }
        });

        this.cursos$.next(cursosActualizados);
      },
      //complete: () => {},
      //error: () => {}
    });

    return this.cursos$.asObservable();
  }

  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        //filtro con los que quiero quedarme, todos menos el que coincide en id
        const cursosActualizados = cursos.filter(
          (curso) => curso.id !== cursoId
        );
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.cursos$.asObservable();
  }
}
