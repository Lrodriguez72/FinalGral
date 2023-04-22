import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumno } from '../alumnos.component';

const ALUMNOS_MOCKS: Alumno[] = [
  {
    id: 1,
    nombre: 'Lisa',
    apellido: 'Simpson',
    fecha_registro: new Date(),
  },
  {
    id: 2,
    nombre: 'Bart',
    apellido: 'Simpson',
    fecha_registro: new Date(),
  },
  {
    id: 3,
    nombre: 'Homero',
    apellido: 'Simpson',
    fecha_registro: new Date(),
  },

  {
    id: 4,
    nombre: 'Marge',
    apellido: 'Simpson',
    fecha_registro: new Date(),
  },

  {
    id: 4,
    nombre: 'Maggie',
    apellido: 'Simpson',
    fecha_registro: new Date(),
  },
];
@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  // Subject
  private alumnos$ = new Subject<Alumno[]>();

  // BehaviorSubject
  private alumno2$ = new BehaviorSubject<Alumno[]>([
    {
      id: 5,
      nombre: 'Montgomery',
      apellido: 'Burns',
      fecha_registro: new Date(),
    },
  ]);

  constructor() {}

  obtenerAlumnos(): Observable<Alumno[]> {
    this.alumnos$.next(ALUMNOS_MOCKS);
    return this.alumnos$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.alumnos$
      .asObservable()
      .pipe(map((alumnos) => alumnos.find((a) => a.id === id)));
  }
}
