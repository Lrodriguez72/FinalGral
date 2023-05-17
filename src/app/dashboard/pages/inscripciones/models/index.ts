import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumno: Alumno;
  fechaInscripcion: Date;
}

export interface InscripcionNormalizada {
  id: number;
  cursoId: number;
  alumnoId: number;
  fechaInscripcion: Date;
}

export interface InscripcionWithStudent extends InscripcionNormalizada {
  alumno: Alumno;
}

export interface InscripcionWithCourse extends InscripcionNormalizada {
  curso: Curso;
}

export type InscripcionWithAll = InscripcionWithStudent & InscripcionWithCourse;
