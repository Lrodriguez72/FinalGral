import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Curso } from '../../cursos/models';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  // Subject
  private curso2$ = new Subject<Curso[]>();

  // BehaviorSubject
  private curso$ = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      nombre: 'Ingeniería de Software',
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
    },
  ]);

  constructor() {}

  obtenerCursos(): Observable<Curso[]> {
    return this.curso$.asObservable();
  }
}
