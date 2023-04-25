import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { Alumno } from '../../alumnos/models';
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
    cursoServicio: CursosService
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
}
