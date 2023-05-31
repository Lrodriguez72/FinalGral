import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface InscripcionAnterior {
  id: number;
  curso: Curso;
  alumno: Alumno;
  fechaInscripcion: Date;
}

export interface Inscripcion {
  id: number;
  cursoId: number;
  alumnoId: number;
  fechaInscripcion: Date;
}

export interface InscripcionWithStudent extends Inscripcion {
  alumno: Alumno;
}

export interface InscripcionWithCourse extends Inscripcion {
  curso: Curso;
}

export interface CreateInscripcionData {
  alumnoId: number;
  cursoId: number;
}

export type InscripcionWithAll = InscripcionWithStudent & InscripcionWithCourse;
