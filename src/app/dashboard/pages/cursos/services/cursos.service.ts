import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { CrearCursoPayload } from '../models';
import { Curso } from '../models';

const CURSOS_MOCKS: Curso[] = [
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

  constructor() {}

  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
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
    function eliminarCurso(cursoId: any, number: any) {
      throw new Error('Function not implemented.');
    }
  }
}
