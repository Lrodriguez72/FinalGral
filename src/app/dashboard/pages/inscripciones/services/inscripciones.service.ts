import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { Alumno } from '../../alumnos/models';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { InscripcionNormalizada, InscripcionWithAll } from '../models';

import { Curso } from '../../cursos/models';

import {
  AlumnosService,
  ALUMNOS_MOCKS,
} from '../../alumnos/services/alumnos.service';
import {
  CursosService,
  CURSOS_MOCKS,
} from '../../cursos/services/cursos.service';
ALUMNOS_MOCKS;

const INSCRIPCIONES_MOCKS: Inscripcion[] = [
  {
    id: 1,
    alumno: ALUMNOS_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(0)!,
    fechaInscripcion: new Date(),
  },
  {
    id: 2,
    alumno: ALUMNOS_MOCKS.at(1)!,
    curso: CURSOS_MOCKS.at(1)!,
    fechaInscripcion: new Date(),
  },
  {
    id: 3,
    alumno: ALUMNOS_MOCKS.at(2)!,
    curso: CURSOS_MOCKS.at(1)!,
    fechaInscripcion: new Date(),
  },
  {
    id: 4,
    alumno: ALUMNOS_MOCKS.at(2)!,
    curso: CURSOS_MOCKS.at(2)!,
    fechaInscripcion: new Date(),
  },
];
@Injectable({
  providedIn: 'root',
})
export class InscripcionesServiceService {
  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(
    INSCRIPCIONES_MOCKS
  );

  constructor(
    private alumnoService: AlumnosService,
    cursoServicio: CursosService,
    //agregado para uso de la API:
    private httpClient: HttpClient
  ) {}

  inscribirAlumnoACurso(alumno: Alumno, curso: Curso) {
    let insc1: Inscripcion = {
      id: 5,
      alumno: alumno,
      curso: curso,
      fechaInscripcion: new Date(),
    };

    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscs) => {
        this.inscripciones$.next([...inscs, insc1]);
      },
      complete: () => {},
      error: () => {},
    });
  }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$.asObservable();
  }

  getInscipcionesDeCurso(
    cursoId: number
  ): Observable<Inscripcion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones) => Inscripciones.filter((a) => a.curso.id == cursoId))
    );
  }

  getInscipcionesDeAlumnos(
    AlumnoId: number
  ): Observable<Inscripcion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones) =>
        Inscripciones.filter((a) => a.alumno.id == AlumnoId)
      )
    );
  }

  eliminarInscripcion(inscripcionId: number): Observable<Inscripcion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        //filtro con los que quiero quedarme, todos menos el que coincide en id
        const inscripcionesActualizados = inscripciones.filter(
          (inscripcion) => inscripcion.id !== inscripcionId
        );
        this.inscripciones$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.inscripciones$.asObservable();
  }

  editarInscripcion(
    inscripcionId: number,
    actualizacion: Partial<Inscripcion>
  ): Observable<Inscripcion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        const inscripcionesActualizados = inscripciones.map((inscripcion) => {
          if (inscripcion.id === inscripcionId) {
            return {
              ...inscripcion,
              ...actualizacion,
            };
          } else {
            return inscripcion;
          }
        });

        this.inscripciones$.next(inscripcionesActualizados);
      },
      //complete: () => {},
      //error: () => {}
    });

    return this.inscripciones$.asObservable();
  }

  //según modificac en modelo E-R con inscripciones con IdCurso e IdAlumno
  // armo el objeto que necesito , antes de enviar los datos a la API
  PostInscripciones(idCurso: number, idAlumno: number): Observable<Object> {
    const inscription: Inscripcion = {
      id: Math.ceil(Math.random() * 100),
      curso: CURSOS_MOCKS.find((c) => c.id == idCurso)!,
      alumno: ALUMNOS_MOCKS.find((a) => a.id == idAlumno)!,
      fechaInscripcion: new Date(),
    };

    return this.httpClient.post<Object>(
      `${enviroment.apiBaseUrl}/inscripciones/ `,
      inscription
    );
  }

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpClient.get<InscripcionWithAll[]>(
      `${enviroment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`
    );
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/inscriptions/${id}`
    );
  }
}
