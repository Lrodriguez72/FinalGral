import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeMap, tap } from 'rxjs';
import { enviroment } from 'src/environments/environments';
import { Alumno } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  // BehaviourSubject
  private alumnos$ = new BehaviorSubject<Alumno[]>([]);

  constructor(private httpClient: HttpClient) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.httpClient
      .get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`)
      .pipe(
        tap((alumnos) => this.alumnos$.next(alumnos)),
        mergeMap(() => this.alumnos$.asObservable())
      );
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.alumnos$
      .asObservable()
      .pipe(map((alumnos) => alumnos.find((a) => a.id === id)));
  }
}
