import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesServiceService {
  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([
    { id: 1, idCurso: 1, idAlumno: 2, fechaInscripcion: new Date() },
    { id: 2, idCurso: 2, idAlumno: 1, fechaInscripcion: new Date() },
  ]);

  constructor() {}

  inscribirAlumnoACurso(idAlumno: number, idCurso: number) {
    let numberId;
    this.inscripciones$.subscribe((inscripciones: Inscripcion[]) => {
      numberId = inscripciones.length + 5;
      let newInscripcion: Inscripcion = {
        id: numberId,
        idCurso: idCurso,
        idAlumno: idAlumno,
        fechaInscripcion: new Date(),
      };

      // this.inscripciones$.next([...inscripciones, newInscripcion]);
    });
  }
}
