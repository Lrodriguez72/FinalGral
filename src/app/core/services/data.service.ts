import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alumno } from 'src/app/dashboard/pages/alumnos/models';
import { AlumnosService } from 'src/app/dashboard/pages/alumnos/services/alumnos.service';
import { Curso } from 'src/app/dashboard/pages/cursos/models';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';
import { InscripcionesServiceService } from 'src/app/dashboard/pages/inscripciones/services/inscripciones.service';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private users$ = new Subject<Usuario>();

  //   private alumnos$ = new BehaviorSubject<Alumno>();

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesServiceService
  ) {}

  //   obtenerUsuarioAutenticado(): Observable<Usuario> {
  //     return this.authUser$.asObservable();
  //   }

  //   login(usuario: Usuario): void {
  //     this.authUser$.next(usuario);
  //   }
}
